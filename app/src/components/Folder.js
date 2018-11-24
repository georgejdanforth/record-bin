import React, { Component } from 'react';
import _ from 'lodash';

import './Folder.css';
import AddFolder from './AddFolder';
import ButtonGroup from './ButtonGroup';
import { FolderIcon, ChevronIcon } from './icons';

class Folder extends Component {

    state = {
        addingFolder: false,
        expanded: false
    };

    toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

    insertAddFolder = () => this.setState({ addingFolder: true });
    cancelAddFolder = () => this.setState({ addingFolder: false });

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
                <span className="folder-title" onClick={this.toggleExpanded}>
                    <FolderIcon/>
                    { this.props.name }
                    <ChevronIcon expanded={this.state.expanded}/>
                </span>
                { this.state.expanded &&
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
                }
            </div>
        );
    }
}

export default Folder;