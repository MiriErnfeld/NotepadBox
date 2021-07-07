import produce from 'immer';
import _ from 'lodash';
import { createReducer } from "./reducerUtils";

const initialState = {
    folders: [],
    newFolder:{}
}
const folderData = {

    addFolder(state, action) { //push a new folder to the state, after creating the folder in midlleWare
        debugger
        let folders = [...state.folders];
        folders = folders.concat(action.payload.newFolder)
            .sort((a, b) => a.folderName.localeCompare(b.folderName))
        state.folders = [...folders];
    },
    setNewFolder(state,action){
        state.newFolder=action.payload.newFolder;
    },
    setAllFoldersForUser(state, action) {
        action.payload.folders.sort((a, b) => a.folderName.localeCompare(b.folderName))
        state.folders = action.payload.folders;
    },

}

export default produce((state, action) => createReducer(state, action, folderData), initialState);