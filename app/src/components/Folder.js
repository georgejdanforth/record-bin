import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';
import _ from 'lodash';

import './Folder.css';
import AddFolder from './AddFolder';
import AddTrack from './AddTrack';
import ButtonGroup from './ButtonGroup';
import Track from '../containers/Track';
import { FolderIcon, ChevronIcon } from './icons';
import { ItemTypes } from '../dnd/itemTypes';
import {
    folderSource,
    folderTarget,
    collectDragSource,
    collectDropTarget
} from '../dnd/folder';

class Folder extends Component {

    state = {
        addingFolder: false,
        addingTrack: false,
        expanded: false
    };

    toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

    insertAddFolder = () => this.setState({ addingFolder: true, addingTrack: false });
    cancelAddFolder = () => this.setState({ addingFolder: false, addingTrack: false });
    insertAddTrack = () => this.setState({ addingFolder: false, addingTrack: true });
    cancelAddTrack = () => this.setState({ addingFolder: false, addingTrack: false });

    getPath = path => this.props.getPath(_.concat([this.props.id], path));

    addFolder = (folderName, path=[]) => this.setState({ addingFolder: false }, () =>
        this.props.addFolder(folderName, _.concat([this.props.id], path))
    );

    deleteFolder = path => this.props.deleteFolder(_.concat([this.props.id], path));

    addTrack = (track, path=[]) => this.setState({ addingTrack: false }, () =>
        this.props.addTrack(track, _.concat([this.props.id], path))
    );

    deleteTrack = (trackId, path=[]) =>
        this.props.deleteTrack(trackId, _.concat([this.props.id], path));

    getHeaderClasses = () => classNames('folder-title', {
        'is-over': this.props.isOver && this.props.canDrop,
        'dragging': this.props.isDragging,
        'cannot-drop': this.props.isOver && !this.props.canDrop,
    });

    renderHeader = () => this.props.connectDragPreview(this.props.connectDropTarget(
        <span className={this.getHeaderClasses()} onClick={this.toggleExpanded}>
            { this.props.connectDragSource(
                <span className="drag-handle"><FolderIcon/></span>
            ) }
            { this.props.name }
            <ChevronIcon expanded={this.state.expanded}/>
        </span>
    ));

    renderFolders = () => this.props.folders
        .sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
            return 0;
        }).map(folder => (
            <li key={folder.id}>
                <FolderContainer
                    getPath={this.getPath}
                    addFolder={this.addFolder}
                    deleteFolder={this.deleteFolder}
                    addTrack={this.addTrack}
                    deleteTrack={this.deleteTrack}
                    {...folder}
                />
            </li>
        ));

    renderTracks = () => this.props.tracks
        .sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
            if (b.title.toUpperCase() > a.title.toUpperCase()) return -1;
            return 0;
        }).map(track => (
            <li key={track.id}>
                <Track
                    getPath={this.getPath}
                    deleteTrack={() => this.deleteTrack(track.id)}
                    {...track}
                />
            </li>
        ));

    render() {
        return (
            <div>
                { this.renderHeader() }
                { this.state.expanded &&
                    <div>
                        <ButtonGroup
                            addFolderDisabled={this.state.addingFolder}
                            insertAddFolder={this.insertAddFolder}
                            addTrackDisabled={this.state.addingTrack}
                            insertAddTrack={this.insertAddTrack}
                            deleteFolder={() => this.deleteFolder([])}
                        />
                        <ul>
                            { this.state.addingFolder &&
                                <li>
                                    <AddFolder
                                        addFolder={this.addFolder}
                                        cancelAddFolder={this.cancelAddFolder}
                                    />
                                </li>
                            }
                            { this.state.addingTrack &&
                                <li>
                                    <AddTrack
                                        addTrack={this.addTrack}
                                        cancelAddTrack={this.cancelAddTrack}
                                    />
                                </li>
                            }
                            { this.renderFolders() }
                        </ul>
                        <ul>{ this.renderTracks() }</ul>
                    </div>
                }
            </div>
        );
    }
}

const FolderContainer = _.flow(
    DragSource(ItemTypes.FOLDER, folderSource, collectDragSource),
    DropTarget([ItemTypes.FOLDER, ItemTypes.TRACK], folderTarget, collectDropTarget),
)(Folder);
export default FolderContainer;