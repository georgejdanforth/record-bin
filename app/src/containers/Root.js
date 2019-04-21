import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import _ from 'lodash';

import './Root.css';
import { addFolder, deleteFolder, editFolder, addTrack, deleteTrack } from '../actions/directoryTree';
import AddFolder from '../components/AddFolder';
import AddTrack from '../components/AddTrack';
import ButtonGroup from '../components/ButtonGroup';
import FolderContainer from './Folder';
import Track from './Track';
import { ItemTypes } from '../dnd/itemTypes';
import { rootTarget, collectDropTarget } from '../dnd/root';

class Root extends Component {

    state = {
        addingFolder: false,
        addingTrack: false,
    };

    insertAddFolder = () => this.setState({ addingFolder: true, addingTrack: false });
    cancelAddFolder = () => this.setState({ addingFolder: false, addingTrack: false });
    insertAddTrack = () => this.setState({ addingFolder: false, addingTrack: true });
    cancelAddTrack = () => this.setState({addingFolder: false, addingTrack: false });

    getPath = path => path;

    addFolder = (folderName, path=[]) => this.setState({ addingFolder: false }, () =>
        this.props.addFolder(path, folderName)
    );

    deleteFolder = path => this.props.deleteFolder(path);

    editFolder = (folderName, path=[]) => this.props.editFolder(path, folderName);

    addTrack = (track, path=[]) => this.setState({ addingTrack: false }, () =>
        this.props.addTrack(path, track)
    );

    deleteTrack = (trackId, path=[]) => this.props.deleteTrack(path, trackId);

    getButtonGroupClasses = ()  => classNames('root-button-group', {
        'is-over': this.props.isOver
    });

    renderButtonGroup = () => this.props.connectDropTarget(
        <span className={this.getButtonGroupClasses()}>
            <ButtonGroup
                addFolderDisabled={this.state.addingFolder}
                insertAddFolder={this.insertAddFolder}
                addTrackDisabled={this.state.addingTrack}
                insertAddTrack={this.insertAddTrack}
                showExtra={false}
            />
        </span>
    );

    renderFolders = () => this.props.directoryTree.folders
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
                    editFolder={this.editFolder}
                    addTrack={this.addTrack}
                    deleteTrack={this.deleteTrack}
                    {...folder}
                />
            </li>
        ));

    renderTracks = () => this.props.directoryTree.tracks
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
                { this.renderButtonGroup() }
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
        );
    }
}

const mapStateToProps = state => ({ directoryTree: state.directoryTree });

export default _.flow(
    DropTarget([ItemTypes.TRACK, ItemTypes.FOLDER], rootTarget, collectDropTarget),
    connect(mapStateToProps, { addFolder, deleteFolder, editFolder, addTrack, deleteTrack })
)(Root);