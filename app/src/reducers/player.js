import { CHANGE_TRACK } from '../actions/player';

const player = (state={ track: null }, action) => {
    switch (action.type) {
        case CHANGE_TRACK:
            return { track: action.track };
        default:
            return state;
    }
};

export default player;