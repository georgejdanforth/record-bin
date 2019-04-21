import React, { Component } from 'react';
import { Icon } from '@mdi/react';
import {
    mdiFolderPlus,
    mdiFolderRemove,
    mdiPencil,
    mdiPlaylistPlus,
} from '@mdi/js';

import './ButtonGroup.css';

const ButtonIcon = (props) => (
    <Icon
        className="action-icon"
        path={props.path}
        size={0.8}
    />
);

class ButtonGroup extends Component {

    state = { deletingFolder: false };

    deleteFolder = () => this.setState({ deletingFolder: true });
    cancelDeleteFolder = () => this.setState({ deletingFolder: false });

    render() {

        const showExtra = this.props.showExtra || this.props.showExtra === undefined;

        return (
            <div className="button-group">
                <button
                    className="action-button tooltip"
                    data-tooltip="Add a new folder"
                    disabled={this.props.addFolderDisabled}
                    onClick={this.props.insertAddFolder}
                >
                    <ButtonIcon path={mdiFolderPlus}/>
                </button>
                <button
                    className="action-button tooltip"
                    data-tooltip="Add a new track or playlist"
                    disabled={this.props.addTrackDisabled}
                    onClick={this.props.insertAddTrack}
                >
                    <ButtonIcon path={mdiPlaylistPlus}/>
                </button>
                {showExtra &&
                    <button
                        className="action-button tooltip"
                        data-tooltip="Edit folder name"
                        disabled={this.props.editFolderDisabled || false}
                        onClick={this.props.enterEditFolder}
                    >
                        <ButtonIcon path={mdiPencil}/>
                    </button>
                }
                {showExtra &&
                    <button
                        className="action-button danger tooltip"
                        data-tooltip="Delete folder"
                        onClick={this.deleteFolder}
                    >
                        <ButtonIcon path={mdiFolderRemove}/>
                    </button>
                }
                { (showExtra && this.state.deletingFolder) &&
                    <span>
                        <small>
                            <i>Action is permanent! Are you sure you want to continue?</i>
                        </small>
                        <span className="confirm-delete-buttons">
                            <button
                                className="confirm-delete-button"
                                onClick={this.props.deleteFolder}
                            >
                                Yes
                            </button>
                            <button
                                className="confirm-delete-button"
                                onClick={this.cancelDeleteFolder}
                            >
                                No
                            </button>
                        </span>
                    </span>
                }
            </div>
        );
    }
}



export default ButtonGroup;