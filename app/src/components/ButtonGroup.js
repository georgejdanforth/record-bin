import React from 'react';
import { Icon } from '@mdi/react';
import { mdiFolderPlus, mdiPlaylistPlus } from '@mdi/js';

import './ButtonGroup.css';

const ButtonGroup = (props) => (
    <div>
        <button
            className="action-button"
            disabled={props.addFolderDisabled}
            onClick={props.insertAddFolder}
        >
            <Icon path={mdiFolderPlus} size={0.8}/>
        </button>
        <button
            className="action-button"
        >
            <Icon path={mdiPlaylistPlus} size={0.8}/>
        </button>
    </div>
);

export default ButtonGroup;