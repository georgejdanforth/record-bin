export const rootTarget = { drop() { return { path: [] }; } };

export const collectDropTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
});
