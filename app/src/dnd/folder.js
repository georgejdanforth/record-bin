import { ItemTypes } from './itemTypes';
import { store } from '../store/store';
import { moveFolder } from '../actions/directoryTree';

export const folderSource = {
    beginDrag(props) {
        return {
            id: props.id,
            itemType: ItemTypes.FOLDER,
        };
    },

    endDrag(props, monitor) {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            store.dispatch(moveFolder(
                props.getPath([props.id]),
                dropResult.path
            ));
        }
    }
};

export const folderTarget = {
    canDrop(props, monitor) {
        const { id, itemType } = monitor.getItem();
        if (itemType === ItemTypes.TRACK) {
            return true;
        } else {
            return !props.getPath([props.id]).includes(id);
        }
    },

    drop(props) {
        return {
            path: props.getPath([props.id])
        };
    }
};

export const collectDragSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

export const collectDropTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
});
