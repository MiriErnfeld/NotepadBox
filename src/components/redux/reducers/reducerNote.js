import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    noteList: []
};

const noteData = {
    addNote(state, action) {
        debugger
        state.noteList.push = (action.payload);
    }
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);