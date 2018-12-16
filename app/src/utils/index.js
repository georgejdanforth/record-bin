import axios from 'axios';
import { isWebUri } from 'valid-url';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

const mediaTypes = {
    SOUNDCLOUD: {
        value: 'SOUNDCLOUD',
        urlRegex: /soundcloud\.com\/[^/]+?(\/sets)?\/[^/]+$/,
    },
    SPOTIFY: {
        value: 'SPOTIFY',
        urlRegex: /open\.spotify\.com\/(track|album|user\/[^/]+\/playlist)\/[^/]+$/,
    },
    BANDCAMP: {
        value: 'BANDCAMP',
        urlRegex: /.+?\.bandcamp\.com\/(album|track)\/[^/]+$/,
    },
    YOUTUBE: {
        value: 'YOUTUBE',
        urlRegex: /youtube\.com\/(watch)\?v=.+?$/,
    },
};

const validateUrl = url => new Promise((resolve, reject) => {
    if (!isWebUri(url)) reject();

    const mediaTypeInfo = _.find(mediaTypes, info => info.urlRegex.test(url));

    if (mediaTypeInfo !== undefined) {
        resolve(url);
    } else {
        reject();
    }
});

export const scrape = url => validateUrl(url)
    .then(url => axios.get(`https://api.recordb.in/scrape?url=${url}`))
    .then(({ data }) => ({ id: `track-${uuidv4()}`, ...data }));
