import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Track.css';
import {
    BandCampIcon,
    MusicIcon,
    PlayIcon,
    SoundCloudIcon,
    SpotifyIcon,
    YoutubeIcon
} from '../components/icons';
import { changeTrack } from '../actions/player';

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

    changeTrack = () => this.props.changeTrack({
        id: this.props.id,
        url: this.props.url,
    });

    render () {
        const playButtonClass = 'play-button'
            + (this.props.player.track.id === this.props.id ? ' playing' : '');

        return (
            <div className="track">
                { this.renderIcon() }
                <button
                    className={playButtonClass}
                    onClick={this.changeTrack}
                >
                    <PlayIcon/>
                </button>
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

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps, { changeTrack })(Track);