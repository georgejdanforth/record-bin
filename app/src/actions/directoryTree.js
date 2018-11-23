export const ADD_FOLDER = 'ADD_FOLDER';

export const addFolder = (directoryTree, path, folderName) => ({
    type: ADD_FOLDER,
    directoryTree,
    path,
    folderName
});