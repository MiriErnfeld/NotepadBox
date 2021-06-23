import produce from 'immer';
import { createReducer } from "./reducerUtils";

const initialState = {
    folders:[]
}
const folderData={



}

export default produce((state, action) => createReducer(state, action, folderData), initialState);