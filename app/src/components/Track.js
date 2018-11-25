import React, { Component } from 'react';

import {
    BandCampIcon,
    MusicIcon,
    SoundCloudIcon,
    SpotifyIcon,
    YoutubeIcon
} from './icons';

class Track extends Component {

    renderIcon = () => {
        switch (this.props.mediaType) {
            case 'BANDCAMP':
                return <BandCampIcon/>;
            case 'SOUNDCLOUD':
                return <SoundCloudIcon/>;
            case 'SPOTIFY':
                return <SpotifyIcon/>;
            case 'YOUTUBE':
                return <YoutubeIcon/>;
            default:
                return <MusicIcon/>;
        }
    };

    render () {
        return (
            <div>
                { this.renderIcon() }
                <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                    { this.props.title }
                </a>
            </div>
        );
    }
}

export default Track;