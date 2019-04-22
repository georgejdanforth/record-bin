import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    Content,
    Control,
    Field,
    Image,
    Media,
    MediaContent,
    MediaLeft,
    Modal,
    ModalBackground,
    ModalContent,
    ModalClose,
} from 'bloomer';
import _ from 'lodash';

import './AddTrackModal.css';
import {
    BandCampIcon,
    FolderIcon,
    SoundCloudIcon,
    SpotifyIcon,
    YoutubeIcon
} from '../components/icons';
import { addTrack } from '../actions/directoryTree';

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
        path: [],
        selectedId: null,
    };

    selectFolder = (id, path) => this.setState({ path: path, selectedId: id });

    addTrack = () => {
        this.props.addTrack(this.state.path, this.props.track);
        this.props.close();
    };

    getMediaTypeIcon = () => {
        switch (this.props.mediaType) {
            case 'BANDCAMP':
                return <BandCampIcon/>;
            case 'SOUNDCLOUD':
                return <SoundCloudIcon/>;
            case 'SPOTIFY':
                return <SpotifyIcon/>;
            case 'YOUTUBE':
                return <YoutubeIcon/>;
        }
    };

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
                            <Media>
                                <MediaLeft>
                                    <Image isSize="64x64" src={this.props.track.thumbnailUrl}/>
                                </MediaLeft>
                                <MediaContent>
                                    <Content><p>{this.props.track.title}</p></Content>
                                </MediaContent>
                            </Media>
                            <br/>
                            <p><strong>Add to:</strong></p>
                        </Field>
                        <Field>
                            <div className="folder-list">
                                <ul>{this.renderFolders()}</ul>
                            </div>
                        </Field>
                        <Field>
                            <Control className="buttons-control">
                                <Button
                                    className="modal-button cancel-button"
                                    onClick={this.props.close}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="modal-button add-button"
                                    onClick={this.addTrack}
                                >
                                    Add
                                </Button>
                            </Control>
                        </Field>
                    </Box>
                </ModalContent>
                <ModalClose onClick={this.props.close}/>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({ directoryTree: state.directoryTree });

export default connect(mapStateToProps, { addTrack })(AddTrackModal);