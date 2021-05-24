import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    count: 0,
    topNote: "",
    rightNote: " ",
    noteList: [{ text: "", check: false, flagColor: false, colors: "#FFEB3B", id: 0, top: " ", right: " " }]
};

const noteData = {
    createNote(state, action) {
        debugger
        let arr = [...state.noteList];
        arr.push(action.payload);
        state.noteList = [...arr]
        console.log(state.noteList);
    },
    getAllNotesForUser(state, action) {
        debugger
        state.noteList = (action.payload.notes);
        console.log(state.noteList);
    },
    setNoteList(state, action) {
        debugger
        state.noteList = action.payload
    }
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);