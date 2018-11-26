import React from 'react';
import { connect } from 'react-redux';

const bandcampPlayer = (embedUrl) => (
    <iframe
        seamless
        src={embedUrl}
        style={{border: 0, width: '100%', height: '120px'}}
        title="bandcamp"
    />
);

const soundcloudPlayer = (embedUrl) => (
    <iframe
        frameborder="no"
        height="120"
        scrolling="no"
        src={embedUrl}
        title="soundcloud"
        width="300"
    />
);

const spotifyPlayer = (embedUrl) => (
    <iframe
        allow="encrypted-media"
        allowtransparency="true"
        frameborder="0"
        height="240"
        src={embedUrl}
        title="spotify"
        width="300"
    />
);

const youtubePlayer = (embedUrl) => (
    <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
        height="120"
        src={embedUrl}
        title="youtube"
        width="300"
    />
);

const getPlayer = (mediaType, embedUrl) => ({
    BANDCAMP: bandcampPlayer,
    SOUNDCLOUD: soundcloudPlayer,
    SPOTIFY: spotifyPlayer,
    YOUTUBE: youtubePlayer
}[mediaType](embedUrl));

const Player = (props) => props.mediaType && props.embedUrl
    ? getPlayer(props.mediaType, props.embedUrl)
    : <div/>;

const mapStateToProps = state => ({ ...state.player.track });

export default connect(mapStateToProps)(Player);