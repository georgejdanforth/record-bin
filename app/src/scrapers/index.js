import axios from 'axios';
import { isWebUri } from 'valid-url';
import _ from 'lodash';

const constructUrl = url => 'http://allorigins.me/get?url=' + encodeURIComponent(url);

const parseHtmlResponse = response => {
    const parser = new DOMParser();
    return parser.parseFromString(response.data.contents, 'text/html');
};

const soundcloudHeaders = url => ({ url, format: 'json' });

const scrapeSoundcloud = (url, mediaType) =>
    axios.post('https://soundcloud.com/oembed', soundcloudHeaders(url))
        .then(({ data }) => ({
            url,
            mediaType,
            artistName: data.author_name,
            title: data.title.replace(` by ${data.author_name}`, ''),
            thumbnailUrl: data.thumbnail_url,
        }));

const scrapeYouTube = (url, mediaType) => ({ url, mediaType });
const scrapeSpotify = (url, mediaType) => ({ url, mediaType });
const scrapeBandCamp = (url, mediaType) => ({ url, mediaType });

export const mediaTypes = {
    SOUNDCLOUD: {
        value: 'SOUNDCLOUD',
        urlRegex: /soundcloud\.com\/[^/]+?(\/sets)?\/[^/]+$/,
        scrapeFn: scrapeSoundcloud,
    },
    SPOTIFY: {
        value: 'SPOTIFY',
        urlRegex: /open\.spotify\.com\/(track|album|user\/[^/]+\/playlist)\/[^/]+$/,
        scrapeFn: scrapeSpotify,
    },
    BANDCAMP: {
        value: 'BANDCAMP',
        urlRegex: /\..+?\.bandcamp\.com\/(album|track)\/[^/]+$/,
        scrapeFn: scrapeBandCamp,
    },
    YOUTUBE: {
        value: 'YOUTUBE',
        urlRegex: /youtube\.com\/(watch)\?v=.+?$/,
        scrapeFn: scrapeYouTube
    },
};

const validateUrl = url => new Promise((resolve, reject) => {
    if (!isWebUri(url)) reject('Not a valid URL.');

    const mediaTypeInfo = _.find(mediaTypes, info => info.urlRegex.test(url));

    if (mediaTypeInfo !== undefined) {
        resolve({ url, mediaType: mediaTypeInfo.value, scrapeFn: mediaTypeInfo.scrapeFn});
    } else {
        reject('Not a valid URL.');
    }
});

export const scrape = url => validateUrl(url)
    .then(({ url, mediaType, scrapeFn}) => scrapeFn(url, mediaType));
