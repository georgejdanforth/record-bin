import axios from 'axios';
import { isWebUri } from 'valid-url';
import _ from 'lodash';

const constructUrl = url => 'http://allorigins.me/get?url=' + encodeURIComponent(url);

const parseHtmlResponse = response => {
    const parser = new DOMParser();
    return parser.parseFromString(response.data.contents, 'text/html');
};

const plaintext = element => element.innerHTML
    .replace(/\n|<.*?>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const soundcloudHeaders = url => ({ url, format: 'json' });

const scrapeSoundcloud = (url, mediaType) =>
    axios.post('https://soundcloud.com/oembed', soundcloudHeaders(url))
        .then(({ data }) => ({
            url,
            mediaType,
            title: data.title,
            thumbnailUrl: data.thumbnail_url,
        }));

const scrapeYouTube = (url, mediaType) =>
    axios.get(constructUrl(`https://www.youtube.com/oembed?url=${url}&format=json`))
        .then(({ data }) => JSON.parse(data.contents))
        .then(({ thumbnail_url, title }) => ({
            url,
            mediaType,
            title,
            thumbnailUrl: thumbnail_url
        }));

const scrapeSpotify = (url, mediaType) =>
    axios.get(constructUrl(`https://embed.spotify.com/oembed?url=${url}`))
        .then(({ data }) => JSON.parse(data.contents))
        .then(({ thumbnail_url, title }) => ({
            url,
            mediaType,
            title,
            thumbnailUrl: thumbnail_url
        }));

const scrapeBandCamp = (url, mediaType) =>
    axios.get(constructUrl(url))
        .then(parseHtmlResponse)
        .then(document => ({
            url,
            mediaType,
            title: plaintext(document.getElementById('name-section')),
            thumbnailUrl: document.querySelector('#tralbumArt img').src
        }));

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
        urlRegex: /.+?\.bandcamp\.com\/(album|track)\/[^/]+$/,
        scrapeFn: scrapeBandCamp,
    },
    YOUTUBE: {
        value: 'YOUTUBE',
        urlRegex: /youtube\.com\/(watch)\?v=.+?$/,
        scrapeFn: scrapeYouTube
    },
};

const validateUrl = url => new Promise((resolve, reject) => {
    if (!isWebUri(url)) reject();

    const mediaTypeInfo = _.find(mediaTypes, info => info.urlRegex.test(url));

    if (mediaTypeInfo !== undefined) {
        resolve({ url, mediaType: mediaTypeInfo.value, scrapeFn: mediaTypeInfo.scrapeFn});
    } else {
        reject();
    }
});

export const scrape = url => validateUrl(url)
    .then(({ url, mediaType, scrapeFn}) => scrapeFn(url, mediaType));
