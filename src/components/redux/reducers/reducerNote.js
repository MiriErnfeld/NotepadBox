import produce from 'immer';
import { actions } from '../actions/action';
import { createReducer } from "./reducerUtils";

const initialState = {
    check: "",
    currentItem: "",
    count: 0,
    topNote: "",
    noteList: [],
    dummyNoteList: [],//notes After Delete In Server display only in client
    newNoteIndex: null,//to get witch new note saved now
    clientNoteIndex: 0//to notes that not save in server
}
const noteData = {

    createNote(state, action) { //from midlleWare
        let i = action.payload.new_note.indexNote
        //option 1:
        // let currentNote=state.noteList.filter(note => note.indexNote==i)
        // currentNote.textNote= action.payload.newText

        //option 2:
        //find the relevant current aouo index in the array in atate
        // let c = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
        // state.noteList[c] = action.payload.new_note
        // console.log(state.noteList[c]);


        let c = state.noteList.indexOf(state.noteList.find(note => note.indexNote === state.newNoteIndex));
        state.noteList[c] = action.payload.new_note;
        console.log(state.noteList[c]);
        debugger
    },
    setAllNoteUser(state, action) {
        state.allNoteUser = action.payload.notes;

    },
    setAllNotesFolder(state, action) { //from midlleWare
        state.noteList = action.payload.folderNotes;
    },
    // updateNoteAction(state, action) { // from midlleWare 
    //     let id = action.payload.user.indexNote
    //     let updateIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === id))
    //     let arr = [...state.noteList]
    //     if (updateIndex !== -1) {
    //         // if (action.payload.c) {
    //         //     arr[updateIndex].colors = action.payload.user.colors
    //         // }
    //         arr[updateIndex].textNote = action.payload.user.textNote
    //         arr[updateIndex].colors = action.payload.user.colors
    //     } state.noteList = [...arr]
    // },

    deleteOnlyFromClient(state, action) {
        let note = action.payload
        let index = action.payload.indexNote
        let arr = [...state.noteList]
        const deleteItem = state.noteList.indexOf(state.noteList.find(x => x.indexNote == index))
        if (deleteItem !== -1) {
            arr.splice(deleteItem, 1)
        }
        state.noteList = [...arr]
        console.log(state.noteList);
    },
    deleteDummyNoteList(state, action) {
        debugger
        let index = action.payload
        let arr = [...state.dummyNoteList]
        arr.splice(index, 1)
        state.dummyNoteList = [...arr]
    },
    setNoteList(state) { //from component configurator.js onClick button insertNote
        debugger
        let c = state.noteList.length;
        let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === c))
        // if (correctIndex !== -1) {//in case that in noteList there is note with this index
        //     debugger
        for (let i = 0; correctIndex !== -1; i++) {
            debugger
            c = c + 1
            let s = state.noteList.indexOf(state.noteList.find(note => note.indexNote === c))
            if (s !== -1) {
                debugger
                correctIndex = s
            }
            else {
                correctIndex = -1
            }
        }
        // }
        let allNote = [...state.noteList]
        let top = Math.floor(Math.random() * 260)
        let left = Math.floor(Math.random() * 600)

        allNote.push({ _id: "", indexNote: c, userId: "", createNote: "", textNote: "", placeX: left, placeY: top, colors: "#FFEB3B", check: "", flagColor: false, })
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
    setDummyNoteList(state, action) {
        debugger
        const index = state.noteList.indexOf(state.noteList.find(x => x.indexNote == action.payload.noteToDelete.indexNote))
        state.noteList[index]._id="";
        state.noteList[index].indexNote=--state.clientNoteIndex;
        state.noteList[index].textNote="";
        
        state.dummyNoteList.push(state.clientNoteIndex);
        console.log(state.dummyNoteList);
    },

    deleteNoteAction(state, action) {
        const updateNoteList = state.noteList.filter(x => x._id !== action.payload.noteToDelete._id)
        state.noteList = updateNoteList;
    },

    setNoteList1(state, action) {
        
        let top = Math.floor(Math.random() * 260)
        let left = Math.floor(Math.random() * 600)

        state.noteList.push({ _id: "", indexNote: --state.clientNoteIndex, userName: "", createNote: "", textNote: "", placeX: left, placeY: top, colors: "#FFEB3B", check: "", flagColor: false, })
    },
    setNewNoteIndex(state, action) {
        state.newNoteIndex=action.payload;
    }
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);