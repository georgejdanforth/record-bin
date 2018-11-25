import { combineReducers } from 'redux';

import directoryTree from './directoryTree';
import player from './player';

const rootReducer = combineReducers({
    directoryTree,
    player,
});

export default rootReducer;