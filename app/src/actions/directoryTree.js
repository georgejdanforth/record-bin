export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const ADD_TRACK = 'ADD_TRACK';

export const addFolder = (directoryTree, path, folderName) => ({
    type: ADD_FOLDER,
    directoryTree,
    path,
    folderName
});

export const deleteFolder = (directoryTree, path) => ({
    type: DELETE_FOLDER,
    directoryTree,
    path,
});

export const addTrack = (directoryTree, path, track) => ({
    type: ADD_TRACK,
    directoryTree,
    path,
    track
});