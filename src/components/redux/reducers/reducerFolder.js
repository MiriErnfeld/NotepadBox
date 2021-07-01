import produce from 'immer';
import { createReducer } from "./reducerUtils";

const initialState = {
    folders: []
}
const folderData = {

    createFolder(state, action) { //add a new folder to the state, from midlleWare
        let folders = [...state.folders];
        folders.push(action.payload.folder);
        state.folders = [...folders];
    },
    setAllFoldersForUser(state, action) {
        state.folders = action.payload.folders;
    }

}

export default produce((state, action) => createReducer(state, action, folderData), initialState);