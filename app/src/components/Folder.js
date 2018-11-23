import React, { Component } from 'react';
import { Button } from 'bloomer';
import _ from 'lodash';

import AddFolder from './AddFolder';

class Folder extends Component {

    state = {
        addingFolder: false,
        folders: []
    };

    componentDidMount()  {
        this.setState({
            folders: this.props.folders.map(folder => (
                <li key={folder.id}>
                    <Folder addFolder={this.addFolder} {...folder}/>
                </li>
            ))
        });
    }

    insertAddFolder = () => this.setState({
        addingFolder: true,
        folders: _.concat(
            [<li key={'add'}><AddFolder addFolder={this.addFolder}/></li>],
            this.state.folders
        )
    });

    addFolder = (folderName, path=[]) => this.setState({
        addingFolder: false,
        folders: this.state.addingFolder
            ? _.drop(this.state.folders)
            : this.state.folders
    }, () => this.props.addFolder(folderName, _.concat([this.props.id], path)));

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
                <ul>{ this.state.folders }</ul>
            </div>
        );
    }
}

export default Folder;