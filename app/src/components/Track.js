import React, { Component } from 'react';

import './Track.css';
import {
    BandCampIcon,
    MusicIcon,
    PlayIcon,
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
            <div className="track">
                { this.renderIcon() }
                <PlayIcon/>
                <img src={this.props.thumbnailUrl} alt="" height="15" width="15"/>
                <a
                    className="track-title"
                    href={this.props.url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    { this.props.title }
                </a>
            </div>
        );
    }
}

export default Track;