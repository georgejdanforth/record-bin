import React, { Component } from 'react';

import './AddFolder.css';
import { FolderIcon } from './icons';

class AddFolder extends Component {

    state = { folderName: null };

    componentDidMount() {
        this.input.focus();
    }

    updateFolderName = ({ target }) => this.setState({
        folderName: target.value
    });

    addFolder = () => {
        if (this.state.folderName && this.state.folderName.trim()) {
            this.props.addFolder(this.state.folderName);
        } else {
            this.props.cancelAddFolder();
        }
    };

    handleKeyUp = ({ key }) => {
        switch (key) {
            case 'Enter':
                this.addFolder();
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
                <FolderIcon/>
                <input
                    className="add-folder-input"
                    onBlur={this.props.cancelAddFolder}
                    onChange={this.updateFolderName}
                    onKeyUp={this.handleKeyUp}
                    placeholder="New Folder. Hit Enter to save."
                    ref={input => this.input = input}
                    type="text"
                />
            </div>
        );
    }
}

export default AddFolder;