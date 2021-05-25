import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    check: " ",
    currentItem: "",
    count: 0,
    topNote: "",
    rightNote: " ",
    noteList: [{ text: "", check: false, flagColor: false, colors: "#FFEB3B", id: -1, top: " ", right: " " }]
};

const noteData = {
    createNote(state, action) {
        debugger
        let arr = [...state.noteList];
        let i = action.payload.i - 1
        arr[i].text = action.payload.newTSext;
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
    },
    setFlagColor(state, action) {
        debugger
        let x = action.payload.id - 1
        let currentFlag = state.noteList[x].flagColor
        state.noteList[x].flagColor = !currentFlag
        console.log(state.noteList);

    },
    changeColor(state, action) {
        debugger
        let currentColor = action.payload.c
        let x = action.payload.item.id
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