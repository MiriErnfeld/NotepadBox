import produce from 'immer';
import { createReducer } from "./reducerUtils";

const initialState = {
    check: "",
    currentItem: "",
    count: 0,
    topNote: "",
    noteList: []
}
const noteData = {

    createNote(state, action) { //from midlleWare
        let i = action.payload.item.indexNote
        //option 1:
        // let currentNote=state.noteList.filter(note => note.indexNote==i)
        // currentNote.textNote= action.payload.newText

        //option 2:
        //find the relevant current aouo index in the array in atate
        let c = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
        console.log(c);
        state.noteList[c].textNote = action.payload.newText
        // state.noteList[i].textNote = action.payload.newText;
        console.log(state.noteList);
    },
    getAllNotesForUser(state, action) { //from midlleWare
        state.noteList = (action.payload.notesFolder);
    },
    updateNoteAction(state, action) { // from midlleWare 
        let id = action.payload.user.indexNote
        let updateIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === id))
        let arr = [...state.noteList]
        if (updateIndex !== -1) {
            // if (action.payload.c) {
            //     arr[updateIndex].colors = action.payload.user.colors
            // }
            arr[updateIndex].textNote = action.payload.user.textNote
            arr[updateIndex].colors = action.payload.user.colors
        } state.noteList = [...arr]
    },
    deleteNoteAction(state, action) { // from midlleWare delete note in state.noteList
        let note = action.payload.note_to_delete
        let index = note.indexNote
        let arr = [...state.noteList]

        const deleteItem = state.noteList.indexOf(state.noteList.find(x => x.indexNote == index))
        if (deleteItem !== -1)
        {
            arr.splice(deleteItem, 1)
        }
        state.noteList = [...arr]
        console.log(state.noteList);
    },
    deleteOnlyFromClient(state, action) {
        let note = action.payload
        let index = action.payload.indexNote
        let arr = [...state.noteList]
        const deleteItem = state.noteList.indexOf(state.noteList.find(x => x.indexNote == index))
        if (deleteItem !== -1)
        {
            arr.splice(deleteItem, 1)
        }
        state.noteList = [...arr]
        console.log(state.noteList);
    },
    setNoteList(state, action) { //from component configurator.js onClick button insertNote
        let c = state.noteList.length;
        let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === c))
        if (correctIndex !== -1) {
            c = state.noteList.length + 1
        }
        let allNote = [...state.noteList]
        let top = Math.floor(Math.random() * 238)
        let left = Math.floor(Math.random() * 800)
        allNote.push({ _id: "", indexNote: c, userName: "", createNote: "", textNote: "", placeX: left, placeY: top, colors: "#FFEB3B", check: "", flagColor: false, })
        state.noteList = [...allNote]

    },
    // placeNote(state, action) {
    //     let x = action.payload.item.indexNote
    //     let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === x))
    //     state.noteList[correctIndex].placeX = action.payload.left
    //     state.noteList[correctIndex].placeY = action.payload.top
    // },
    setFlagColor(state, action) {  //set flagColor only to true from component myNote.js
        let i = action.payload.indexNote
        let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
        let currentFlag = state.noteList[correctIndex].flagColor
        const f = state.noteList[correctIndex].flagColor
        if (f === true)
            state.noteList[correctIndex].flagColor = false
        else
            state.noteList[correctIndex].flagColor = true
    },
    closePreview(state, action) { //set flagColor only to false  from component myNote.js
        let index = action.payload
        state.noteList[index].flagColor = false
    },
    changeColorAction(state, action) { // set color in state.noteList from component myNote.js
        let currentColor = action.payload.c
        let x = action.payload.item.indexNote
        let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === x))
        let arr = [...state.noteList]
        arr[correctIndex].colors = currentColor
        state.noteList = [...arr]
    },
    setCheck(state, action) {// set check from component myNote.js
        state.check = action.payload
    },
    setCurrentItem(state, action) { //set setCurrentItem  from component myNote.js
        state.currentItem = action.payload
    },
    // setPlaceNote(state, action) {
    //     let x = action.payload.item.indexNote
    //     let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === x))
    //     state.noteList[correctIndex].placeX = action.payload.x
    //     state.noteList[correctIndex].placeY = action.payload.y


    // },

    noteToSpesificFolder(state, action) {}
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);