import React from 'react';
import { Icon } from '@mdi/react';
import {
    mdiFolderPlus,
    mdiFolderRemove,
    mdiPlaylistPlus
} from '@mdi/js';

import './ButtonGroup.css';

const ButtonIcon = (props) => (
    <Icon
        className="action-icon"
        path={props.path}
        size={0.8}
    />
);

const ButtonGroup = (props) => (
    <div>
        <button
            className="action-button"
            disabled={props.addFolderDisabled}
            onClick={props.insertAddFolder}
        >
            <ButtonIcon path={mdiFolderPlus}/>
        </button>
        <button className="action-button">
            <ButtonIcon path={mdiPlaylistPlus}/>
        </button>
        { (props.showDelete || true) &&
            <button
                className="action-button danger"
                onClick={props.deleteFolder}
            >
                <ButtonIcon path={mdiFolderRemove}/>
            </button>
        }
    </div>
);

export default ButtonGroup;