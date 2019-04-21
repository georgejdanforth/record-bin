import React from 'react';
import { Icon } from '@mdi/react';
import {
    mdiAlertCircle,
    mdiBandcamp,
    mdiChevronRight,
    mdiChevronDown,
    mdiDelete,
    mdiDrag,
    mdiFolder,
    mdiLoading,
    mdiMusic,
    mdiPencil,
    mdiPlayCircleOutline,
    mdiSoundcloud,
    mdiSpotify,
    mdiYoutube,
} from '@mdi/js';

import './icons.css';

export const BandCampIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiBandcamp}
        size={0.8}
        color="#629aa9"
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

export const DeleteIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiDelete}
        size={0.8}
    />
);

export const DragIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiDrag}
        size={0.8}
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

export const FolderIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiFolder}
        size={0.8}
        color="lightgray"
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

export const PlayIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiPlayCircleOutline}
        size={0.8}
    />
);

export const SpinnerIcon = (props) => (
    <Icon
        className="folder-icon"
        path={mdiLoading}
        size={props.size || 0.8}
        color={props.color || 'gray'}
        spin={props.spin || 1}
    />
);

export const SoundCloudIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiSoundcloud}
        size={0.8}
        color="#ff8800"
    />
);

export const SpotifyIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiSpotify}
        size={0.8}
        color="#1db954"
    />
);

export const YoutubeIcon = () => (
    <Icon
        className="folder-icon"
        path={mdiYoutube}
        size={0.8}
        color="#ff0000"
    />
);
