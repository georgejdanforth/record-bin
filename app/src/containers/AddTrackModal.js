import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Box,
    Field,
    Modal,
    ModalBackground,
    ModalContent,
    ModalClose,
} from 'bloomer';
import _ from 'lodash';

import './AddTrackModal.css';
import { FolderIcon } from '../components/icons';

class Folder extends Component {

    selectFolder = (id, path=[]) =>
        this.props.selectFolder(id, _.concat([this.props.id], path));

    renderFolders = () => this.props.folders
        .sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
            return 0;
        }).map(folder => (
            <li key={folder.id}>
                <Folder
                    selectFolder={this.selectFolder}
                    selectedId={this.props.selectedId}
                    {...folder}
                />
            </li>
        ));

    render() {
        const titleClass = 'folder' + (
            this.props.id === this.props.selectedId
                ? ' selected'
                : ''
        );

        return (
            <div>
                <span
                    className={titleClass}
                    onClick={() => this.selectFolder(this.props.id)}
                >
                    <span><FolderIcon/></span>
                    <span>{this.props.name}</span>
                </span>
                <div>
                    <ul>{this.renderFolders()}</ul>
                </div>
            </div>
        );
    }
}

class AddTrackModal extends Component {

    state = {
        path: null,
        selectedId: null,
    };

    selectFolder = (id, path) => this.setState({ path: path, selectedId: id }, () => console.log(this.state));

    renderFolders = () => this.props.directoryTree.folders
        .sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
            return 0;
        }).map(folder => (
            <li key={folder.id}>
                <Folder
                    selectFolder={this.selectFolder}
                    selectedId={this.state.selectedId}
                    {...folder}
                />
            </li>
        ));

    render() {
        if (!this.props.track) return <div/>;
        return (
            <Modal isActive={this.props.isActive}>
                <ModalBackground onClick={this.props.close}/>
                <ModalContent>
                    <Box>
                        <Field>
                            <span>do ittt</span>
                        </Field>
                        <Field>
                            <div className="folder-list">
                                <ul>{this.renderFolders()}</ul>
                            </div>
                        </Field>
                    </Box>
                </ModalContent>
                <ModalClose onClick={this.props.close}/>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({ directoryTree: state.directoryTree });

export default connect(mapStateToProps)(AddTrackModal);