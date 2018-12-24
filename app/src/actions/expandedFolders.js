export const EXPAND_FOLDER = 'EXPAND_FOLDER';
export const COLLAPSE_FOLDER = 'COLLAPSE_FOLDER';

export const expandFolder = folderId => ({ type: EXPAND_FOLDER, folderId });
export const collapseFolder = folderId => ({ type: COLLAPSE_FOLDER, folderId });