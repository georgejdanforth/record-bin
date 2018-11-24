export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';

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