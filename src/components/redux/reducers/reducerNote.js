import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    check: " ",
    currentItem: "",
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
        
        let x = action.payload.item.id
        state.noteList[x].colors = action.payload.c
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