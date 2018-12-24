import { combineReducers } from 'redux';

import directoryTree from './directoryTree';
import expandedFolders from './expandedFolders';
import player from './player';

const rootReducer = combineReducers({
    directoryTree,
    expandedFolders,
    player,
});

export default rootReducer;