import axios from 'axios';

export const mediaTypes = {
    SOUNDCLOUD: 'SOUNDCLOUD',
    SPOTIFY: 'SPOTIFY',
    BANDCAMP: 'BANDCAMP',
    YOUTUBE: 'YOUTUBE',
};

const constructUrl = url => 'http://allorigins.me/get?url=' + encodeURIComponent(url);

const parseHtmlResponse = response => {
    const parser = new DOMParser();
    return parser.parseFromString(response.data.contents, 'text/html');
};

const soundcloudHeaders = url => ({ url, format: 'json' });

const scrapeSoundcloud = url =>
    axios.post('https://soundcloud.com/oembed', soundcloudHeaders(url))
        .then(({ data }) => ({
            url,
            artistName: data.author_name,
            title: data.title.replace(` by ${data.author_name}`, ''),
            thumbnailUrl: data.thumbnail_url,
            mediaType: mediaTypes.SOUNDCLOUD,
        }));

export const scrape = url => scrapeSoundcloud(url);
