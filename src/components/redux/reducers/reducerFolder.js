import produce from 'immer';
import { createReducer } from "./reducerUtils";

const initialState = {
    folders: []
}
const folderData = {

    addFolder(state, action) { //push a new folder to the state, after creating the folder in midlleWare
        debugger
        let folders = [...state.folders];
        folders.push(action.payload.newFolder);
        state.folders = [...folders];
    },
    setAllFoldersForUser(state, action) {
        state.folders = action.payload.folders;
    }

}

export default produce((state, action) => createReducer(state, action, folderData), initialState);