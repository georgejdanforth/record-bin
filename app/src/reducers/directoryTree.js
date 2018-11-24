import _ from 'lodash';
import uuidv4 from 'uuid/v4';

import { ADD_FOLDER, DELETE_FOLDER } from '../actions/directoryTree';

const getNode = (root, path, depth=0) => depth >= path.length
    ? root
    : getNode(
        _.find(root.folders, folder => folder.id === path[depth]),
        path,
        depth + 1
    );

const getParentNode = (root, path, depth=0) => depth >= path.length - 1
    ? root
    : getParentNode(
        _.find(root.folders, folder => folder.id === path[depth]),
        path,
        depth + 1
    );


const deepCopy = object => JSON.parse(JSON.stringify(object));

const addFolder = action => {
    const tree = deepCopy(action.directoryTree);
    const folder = getNode(tree, action.path);
    folder.folders.push({
        id: `folder-${uuidv4()}`,
        name: action.folderName,
        folders: [],
        tracks: [],
    });

    return tree;
};

const deleteFolder = action => {
    const tree = deepCopy(action.directoryTree);
    const parent = getParentNode(tree, action.path);
    parent.folders = parent.folders.filter(
        folder => folder.id !== action.path[action.path.length - 1]
    );

    return tree;
};

const addTrack = action => {
    const tree = deepCopy(action.directoryTree);
    const folder = getNode(tree, action.path);
    folder.tracks.push(action.track);

    return tree;
};

const directoryTree = (state={
    id: 'root',
    name: 'root',
    folders: [],
    tracks: [],
}, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return addFolder(action);
        case DELETE_FOLDER:
            return deleteFolder(action);
        default:
            return state;
    }
};

export default directoryTree;