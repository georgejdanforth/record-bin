import _ from 'lodash';
import uuidv4 from 'uuid/v4';

import { ADD_FOLDER } from '../actions/directoryTree';

const getNode = (root, path, depth=0) => depth >= path.length
    ? root
    : getNode(
        _.find(root.folders, folder => folder.name === path[depth]),
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
        folders: []
    });

    return tree;
};

const directoryTree = (state={ id: 'root', name: 'root', folders: [] }, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return addFolder(action);
        default:
            return state;
    }
};

export default directoryTree;