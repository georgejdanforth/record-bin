import _ from 'lodash';

import { EXPAND_FOLDER, COLLAPSE_FOLDER } from '../actions/expandedFolders';

const expandedFolders = (state=[], action) => {
    switch (action.type) {
        case EXPAND_FOLDER:
            return _.concat(state, [action.folderId]);
        case COLLAPSE_FOLDER:
            return _.without(state, action.folderId);
        default:
            return state;
    }
};

export default  expandedFolders;