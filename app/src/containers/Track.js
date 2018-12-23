import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import _ from 'lodash';

import './Track.css';
import {
    BandCampIcon,
    DeleteIcon,
    MusicIcon,
    PlayIcon,
    SoundCloudIcon,
    SpotifyIcon,
    YoutubeIcon
} from '../components/icons';
import { ItemTypes } from '../dnd/itemTypes';
import { store } from '../store/store';
import { moveTrack } from '../actions/directoryTree';
import { changeTrack } from '../actions/player';

const trackSource = {
    beginDrag(props) {
        return {
            id: props.id,
            itemType: ItemTypes.TRACK,
        };
    },

    endDrag(props, monitor) {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            store.dispatch(moveTrack(
                props.id,
                props.getPath([]),
                dropResult.path
            ));
        }
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

class Track extends Component {

    getPath = path => this.props.getPath(_.concat([this.props.id], path));

    changeTrack = () => this.props.changeTrack({
        id: this.props.id,
        embedUrl: this.props.embedUrl,
        mediaType: this.props.mediaType,
        url: this.props.url,
    });

    getMediaTypeIcon = () => {
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

    renderIcon = () => this.props.connectDragSource(
        <span className="drag-handle">{ this.getMediaTypeIcon() }</span>
    );

    render () {
        const playButtonClass = 'play-button' + (
            this.props.player.track && this.props.player.track.id === this.props.id
                ? ' playing'
                : ''
        );

        const trackClass = 'track' + (this.props.isDragging ? ' dragging' : '');

        return this.props.connectDragPreview(
            <div className={trackClass}>
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
                <button
                    className="delete-button tooltip"
                    data-tooltip="Delete track"
                    onClick={this.props.deleteTrack}
                >
                    <DeleteIcon/>
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ player: state.player });

export default _.flow(
    DragSource(ItemTypes.TRACK, trackSource, collect),
    connect(mapStateToProps, { changeTrack })
)(Track);
