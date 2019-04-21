import React, { Component } from 'react';

import './EditFolder.css';

class EditFolder extends Component {

    state = { folderName: null };

    componentDidMount() {
        this.setState({ folderName: this.props.currentFolderName }, () => {
            this.input.value = this.props.currentFolderName;
            this.input.focus();
            this.input.select();
        });
    }

    updateFolderName = ({ target }) => this.setState({ folderName: target.value });

    handleKeyUp = ({ key }) => {
        switch (key) {
            case 'Enter':
                this.props.editFolder(this.state.folderName);
                break;
            case 'Escape':
                this.props.cancelEditFolder();
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <span>
                <input
                    className="edit-folder-input"
                    onBlur={this.props.cancelEditFolder}
                    onChange={this.updateFolderName}
                    onKeyUp={this.handleKeyUp}
                    ref={input => this.input = input}
                    type="text"
                />
            </span>
        );
    }
}

export default EditFolder;