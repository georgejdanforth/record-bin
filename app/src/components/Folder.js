import React, { Component } from 'react';
import { Button } from 'bloomer';
import Icon from '@mdi/react';
import {
    mdiChevronDown,
    mdiChevronRight,
    mdiFolder,
    mdiFolderPlus
} from '@mdi/js';
import _ from 'lodash';

import './Folder.css';
import AddFolder from './AddFolder';

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
                    <Icon
                        className="folder-icon"
                        path={mdiFolder}
                        size={0.8}
                        color="lightgray"
                    />
                    { this.props.name }
                    <Icon
                        className="chevron-icon"
                        path={this.state.expanded ? mdiChevronDown : mdiChevronRight}
                        size={0.8}
                        color="gray"
                    />
                </span>
                { this.state.expanded &&
                    <div>
                        <div>
                            <Button
                                className="action-button"
                                disabled={this.state.addingFolder}
                                onClick={this.insertAddFolder}
                            >
                                <Icon path={mdiFolderPlus} size={0.8}/>
                            </Button>
                        </div>
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