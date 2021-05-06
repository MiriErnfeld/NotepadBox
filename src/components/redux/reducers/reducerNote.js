import produce from 'immer';
import { createReducer } from "./reducerUtils";
import moment from 'moment';


const initialState = {
    noteList:[]
};

const noteDAta = {

    addNote(state, action) {

        state.noteList.push = (action.payload);
    }
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);