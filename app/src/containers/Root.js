import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFolder, deleteFolder } from '../actions/directoryTree';
import AddFolder from '../components/AddFolder';
import ButtonGroup from '../components/ButtonGroup';
import Folder from '../components/Folder';

class Root extends Component {

    state = { addingFolder: false };

    insertAddFolder = () => this.setState({ addingFolder: true });
    cancelAddFolder = () => this.setState({ addingFolder: false });

    addFolder = (folderName, path=[]) => this.setState(
        { addingFolder: false },
        () => this.props.addFolder(this.props.directoryTree, path, folderName)
    );

    deleteFolder = path => this.props.deleteFolder(
        this.props.directoryTree,
        path
    );

    renderFolders = () => this.props.directoryTree.folders.map(folder => (
        <li key={folder.id}>
            <Folder
                addFolder={this.addFolder}
                deleteFolder={this.deleteFolder}
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
        deleteFolder
    }
)(Root);