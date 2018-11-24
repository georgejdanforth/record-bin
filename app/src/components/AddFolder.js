import React, { Component } from 'react';
import { Icon } from '@mdi/react';
import { mdiFolder } from '@mdi/js';

import './Folder.css';
import './AddFolder.css';

class AddFolder extends Component {

    state = { folderName: null };

    componentDidMount() {
        this.input.focus();
    }

    updateFolderName = ({ target }) => this.setState({
        folderName: target.value
    });

    handleKeyUp = ({ key }) => {
        switch (key) {
            case 'Enter':
                this.props.addFolder(this.state.folderName);
                break;
            case 'Escape':
                this.props.cancelAddFolder();
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <div>
                <Icon
                    className="folder-icon"
                    path={mdiFolder}
                    size={0.8}
                    color="lightgray"
                />
                <input
                    className="add-folder-input"
                    onBlur={this.props.cancelAddFolder}
                    onChange={this.updateFolderName}
                    onKeyUp={this.handleKeyUp}
                    placeholder="New Folder"
                    ref={input => this.input = input}
                    type="text"
                />
            </div>
        );
    }
}

export default AddFolder;