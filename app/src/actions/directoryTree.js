export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const EDIT_FOLDER = 'EDIT_FOLDER';
export const MOVE_FOLDER = 'MOVE_FOLDER';
export const ADD_TRACK = 'ADD_TRACK';
export const DELETE_TRACK = 'DELETE_TRACK';
export const MOVE_TRACK = 'MOVE_TRACK';

export const addFolder = (path, folderName) => ({
    type: ADD_FOLDER,
    path,
    folderName
});

export const deleteFolder = path => ({
    type: DELETE_FOLDER,
    path,
});

export const editFolder = (path, folderName) => ({
    type: EDIT_FOLDER,
    path,
    folderName
});

export const moveFolder = (fromPath, toPath) => ({
    type: MOVE_FOLDER,
    fromPath,
    toPath
});

export const addTrack = (path, track) => ({
    type: ADD_TRACK,
    path,
    track
});

export const deleteTrack = (path, trackId) => ({
    type: DELETE_TRACK,
    path,
    trackId
});

export const moveTrack = (trackId, trackPath, folderPath) => ({
    type: MOVE_TRACK,
    trackId,
    trackPath,
    folderPath
});