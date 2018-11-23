import React, { Component } from 'react';
import { Button } from 'bloomer';
import _ from 'lodash';

import AddFolder from './AddFolder';

class Folder extends Component {

    state = { addingFolder: false };

    insertAddFolder = () => this.setState({ addingFolder: true });

    addFolder = (folderName, path=[]) => this.setState(
        { addingFolder: false },
        () => this.props.addFolder(folderName, _.concat([this.props.id], path))
    );

    renderFolders = () => this.props.folders.map(folder => (
        <li key={folder.id}>
            <Folder addFolder={this.addFolder} {...folder}/>
        </li>
    ));

    render() {
        return (
            <div>
                <span>
                    { this.props.name }
                    <Button
                        disabled={this.state.addingFolder}
                        onClick={this.insertAddFolder}
                    >
                        +
                    </Button>
                </span>
                <ul>
                    { this.state.addingFolder && <li><AddFolder addFolder={this.addFolder}/></li> }
                    { this.renderFolders() }
                </ul>
            </div>
        );
    }
}

export default Folder;