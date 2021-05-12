import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    noteList: []
};

const noteData = {
    createNote(state, action) {
        debugger;
        let arr = [...state.noteList];
        arr.push(action.payload);
        state.noteList = [...arr]
        console.log(state.noteList);
    }
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);