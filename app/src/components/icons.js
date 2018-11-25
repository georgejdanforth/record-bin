import React from 'react';
import { Icon } from '@mdi/react';
import {
    mdiAlertCircle,
    mdiChevronRight,
    mdiChevronDown,
    mdiFolder,
    mdiLoading,
    mdiMusic,
} from '@mdi/js';

import './icons.css';

export const FolderIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiFolder}
        size={0.8}
        color="lightgray"
    />
);

export const ChevronIcon = (props) => (
    <Icon
        className="chevron-icon"
        path={props.expanded ? mdiChevronDown : mdiChevronRight}
        size={0.8}
        color="gray"
    />
);

export const ErrorIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiAlertCircle}
        size={0.8}
        color="crimson"
    />
);

export const MusicIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiMusic}
        size={0.8}
        color="lightgray"
    />
);

export const SpinnerIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiLoading}
        size={0.8}
        color="gray"
        spin={1}
    />
);