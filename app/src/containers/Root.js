import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFolder, deleteFolder, addTrack } from '../actions/directoryTree';
import AddFolder from '../components/AddFolder';
import AddTrack from '../components/AddTrack';
import ButtonGroup from '../components/ButtonGroup';
import Folder from '../components/Folder';

class Root extends Component {

    state = {
        addingFolder: false,
        addingTrack: false,
    };

    insertAddFolder = () => this.setState({ addingFolder: true });
    cancelAddFolder = () => this.setState({ addingFolder: false });
    insertAddTrack = () => this.setState({ addingFolder: false, addingTrack: true });
    cancelAddTrack = () => this.setState({ addingFolder: false, addingTrack: false });

    addFolder = (folderName, path=[]) => this.setState(
        { addingFolder: false },
        () => this.props.addFolder(this.props.directoryTree, path, folderName)
    );

    deleteFolder = path => this.props.deleteFolder(
        this.props.directoryTree,
        path
    );

    addTrack = (track, path=[]) => this.setState(
        { addingTrack: false },
        () => this.props.addTrack(this.props.directoryTree, path, track)
    );

    renderFolders = () => this.props
        .directoryTree
        .folders
        .sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
            return 0;
        }).map(folder => (
            <li key={folder.id}>
                <Folder
                    addFolder={this.addFolder}
                    deleteFolder={this.deleteFolder}
                    addTrack={this.addTrack}
                    {...folder}
                />
            </li>
        ));

    render() {
        return (
            <div>
                <ButtonGroup
                    addFolderDisabled={this.state.addingFolder}
                    insertAddFolder={this.insertAddFolder}
                    addTrackDisabled={this.state.addingTrack}
                    insertAddTrack={this.insertAddTrack}
                    showDelete={false}
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
            </div>
        );
    }
}

const mapStateToProps = state => ({ directoryTree: state.directoryTree });

export default connect(
    mapStateToProps,
    {
        addFolder,
        deleteFolder,
        addTrack,
    }
)(Root);