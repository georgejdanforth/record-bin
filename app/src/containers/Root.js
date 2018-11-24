import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFolder } from '../actions/directoryTree';
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

    renderFolders = () => this.props.directoryTree.folders.map(folder => (
        <li key={folder.id}>
            <Folder addFolder={this.addFolder} {...folder}/>
        </li>
    ));

    render() {
        return (
            <div>
                <ButtonGroup
                    addFolderDisabled={this.state.addingFolder}
                    insertAddFolder={this.insertAddFolder}
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

export default connect(mapStateToProps, { addFolder })(Root);