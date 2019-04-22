import React, { Component } from 'react';
import {
    Box,
    Modal,
    ModalBackground,
    ModalContent,
    ModalClose,
} from 'bloomer';

class AddTrackModal extends Component {

    render() {
        if (!this.props.track) return <div/>;
        return (
            <Modal isActive={this.props.isActive}>
                <ModalBackground onClick={this.props.close}/>
                <ModalContent>
                    <Box>
                        <img src={this.props.track.thumbnailUrl}/>
                        <ul>
                            <li>{this.props.track.title}</li>
                            <li>{this.props.track.mediaType}</li>
                        </ul>
                    </Box>
                </ModalContent>
                <ModalClose onClick={this.props.close}/>
            </Modal>
        );
    }
}

export default AddTrackModal;