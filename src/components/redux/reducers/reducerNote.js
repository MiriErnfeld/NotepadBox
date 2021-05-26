import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    check: " ",
    currentItem: "",
    count: 0,
    topNote: "",

    noteList: [{ indexNote: -1, userName: "", createNote: "", textNote: "", colors: "#FFEB3B", placeX: " ", placeY: " ", check: false, flagColor: false }]
};

const noteData = {
    setUser(state, action) {
        debugger
        state.noteList.userName = action.payload
    },
    createNote(state, action) {
        debugger
        // let arr = [...state.noteList];
        let i = action.payload.item.indexNote
        // arr[i].textNote = action.payload.newText;
        state.noteList[i].textNote = action.payload.newText;
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
    },
    setFlagColor(state, action) {
        debugger
        let x = action.payload.indexNote
        let currentFlag = state.noteList[x].flagColor
        state.noteList[x].flagColor = !currentFlag
        console.log(state.noteList);

    },
    changeColor(state, action) {
        debugger
        let currentColor = action.payload.c
        let x = action.payload.item.indexNote
        console.log(state.noteList[x].colors);
        state.noteList[x].colors = currentColor
    },
    setCheck(state, action) {
        debugger
        state.check = action.payload
    },
    setCurrentItem(state, action) {
        debugger
        state.currentItem = action.payload
    }

};

export default produce((state, action) => createReducer(state, action, noteData), initialState);