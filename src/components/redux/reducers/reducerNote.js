import produce from 'immer';
import { createReducer } from "./reducerUtils";

const initialState = {
    check: " ",
    currentItem: "",
    count: 0,
    topNote: "",

    noteList: []
}
const noteData = {
    setUser(state, action) { //from midlleWare
        debugger
        state.noteList.userName = action.payload
    },
    createNote(state, action) { //from midlleWare
        debugger
        // let arr = [...state.noteList];
        let i = action.payload.item.indexNote
        // arr[i].textNote = action.payload.newText;
        state.noteList[i].textNote = action.payload.newText;
        console.log(state.noteList);
    },
    getAllNotesForUser(state, action) { //from midlleWare
        debugger
        state.noteList = (action.payload.notes);
        debugger
        console.log(state.noteList[0].flagColor);
        console.log(state.noteList);
    },
    updateNoteAction(state, action) { // from midlleWare 
        debugger
        let id = action.payload.user.userName
        let text = action.payload.user.textNote
        const updateItem = state.noteList.indexOf(state.noteList.find(x => x.userName == id))
        if (updateItem !== -1)
            state.noteList[updateItem] = action.payload.item;
    },
    DeleteNoteAction(state, action) { // from midlleWare delete note in state.noteList
        debugger
        let note = action.payload.note_to_delete
        let index = note.indexNote
        const deleteItem = state.noteList.indexOf(state.noteList.find(x => x.indexNote == index))
        if (deleteItem !== -1)
            state.noteList.splice(index, 1)
        console.log(state.noteList);
    },
    setNoteList(state, action) { //from component configurator.js onClick button insertNote
        debugger
        let c = state.noteList.length;
        let allNote = [...state.noteList]
        allNote.push({ indexNote: c, userName: "", createNote: "", textNote: "", colors: "#FFEB3B", placeX: "", placeY: "", check: false, flagColor: false, })
        state.noteList = [...allNote]
    },
    setFlagColor(state, action) {  //set flagColor only to true from component myNote.js
        debugger
        let x = action.payload.indexNote
        // let currentFlag = state.noteList[x].flagColor
        let arr = [...state.noteList]
        // let flag = (!currentFlag)
        arr[x].flagColor = true
        state.noteList = [...arr]
        console.log(arr);
        console.log(state.noteList);

    },
    closePreview(state, action) { //set flagColor only to false  from component myNote.js
        debugger
        let index = action.payload
        state.noteList[index].flagColor = false
    },
    changeColorAction(state, action) { // set color in state.noteList from component myNote.js
        debugger
        let currentColor = action.payload.c
        let x = action.payload.item.indexNote
        console.log(state.noteList[x].colors);
        let arr = [...state.noteList]
        arr[x].colors = currentColor
        state.noteList = [...arr]
    },
    setCheck(state, action) {// set check from component myNote.js
        debugger
        state.check = action.payload
    },
    setCurrentItem(state, action) { //set setCurrentItem  from component myNote.js
        debugger
        state.currentItem = action.payload
    },
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);