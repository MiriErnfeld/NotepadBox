import produce from 'immer';
import { createReducer } from "./reducerUtils";



const initialState = {
    check: " ",
    currentItem: "",
    count: 0,
    topNote: "",

    noteList: []
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
        debugger
        console.log(state.noteList[0].flagColor);
        console.log(state.noteList);
    },
    updateNote(state, action) {
        debugger
        let id = action.payload.item.indexNote
        let text = action.payload.newText
        state.noteList[id] = action.payload.item;
        debugger
        console.log(state.noteList[0].flagColor);
        console.log(state.noteList);
    },
    setNoteList(state, action) {
        debugger
        let c = state.noteList.length;
        let allNote = [...state.noteList]
        allNote.push({ indexNote: c, userName: "", createNote: "", textNote: "", colors: "#FFEB3B", placeX: "", placeY: "", check: false, flagColor: false, })
        state.noteList = [...allNote]
    },
    setFlagColor(state, action) {
        debugger
        let x = action.payload.indexNote
        let currentFlag = state.noteList[x].flagColor
        // state.noteList[x].push(flagColor = !currentFlag)
        let arr = [...state.noteList]
        arr[x].flagColor = !currentFlag
        state.noteList = [...arr]
        console.log(arr);
        console.log(state.noteList);

    },
    changeColor(state, action) {
        debugger
        let currentColor = action.payload.c
        let x = action.payload.item.indexNote
        console.log(state.noteList[x].colors);
        let arr = [...state.noteList]

        arr[x].colors = currentColor
        state.noteList = [...arr]
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