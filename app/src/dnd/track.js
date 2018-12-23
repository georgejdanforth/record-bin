import { ItemTypes } from './itemTypes';
import { store } from '../store/store';
import { moveTrack } from '../actions/directoryTree';

export const trackSource = {
    beginDrag(props) {
        return {
            id: props.id,
            itemType: ItemTypes.TRACK,
        };
    },

    endDrag(props, monitor) {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            store.dispatch(moveTrack(
                props.id,
                props.getPath([]),
                dropResult.path
            ));
        }
    }
};

export const collectDragSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});
