import produce from 'immer';
import { actions } from '../actions/action';
import { createReducer } from "./reducerUtils";

const initialState = {
    check: "",
    currentItem: "",
    count: 0,
    topNote: "",
    noteList: [],
    dummyNoteList: []//notes After Delete In Server display only in client
}
const noteData = {
<<<<<<< HEAD
    setUser(state, action) { //from midlleWare
        debugger
        state.noteList.userName = action.payload
    },
    createNote(state, action) { //from middleWare
        debugger
        let i = action.payload.new_note.indexNote
        //find the relevant current aouo index in the array in atate
        let c = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
        console.log(c);
        state.noteList[c].textNote = action.payload.new_note.newText
        state.noteList[c]._id = action.payload.new_note._id
        console.log(state.noteList);
    },
    getAllNotesForUser(state, action) { //from midlleWare
        state.noteList = (action.payload.notes);
=======

    createNote(state, action) { //from midlleWare
        let i = action.payload.new_note.indexNote
        //option 1:
        // let currentNote=state.noteList.filter(note => note.indexNote==i)
        // currentNote.textNote= action.payload.newText

        //option 2:
        //find the relevant current aouo index in the array in atate
        let c = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
        state.noteList[c] = action.payload.new_note
        console.log(state.noteList[c]);
    },
    getAllNotesForUser(state, action) { //from midlleWare
        state.noteList = (action.payload.folderNotes);
>>>>>>> 35d37c27d95852d577dfa3387e35e3581ccf3f31
    },
    // setPosition(state, action) {
    //     debugger
    //     let i = action.payload.ressult.user.indexNote
    //     let correctIndex = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
    //     let x = action.payload.position.x
    //     let y = action.payload.position.y
    //     state.noteList[correctIndex].placeX = x
    //     state.noteList[correctIndex].placeY = y
    //     console.log(state.noteList);
    // },
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

    deleteOnlyFromClient(state, action) {
<<<<<<< HEAD
        debugger
        // let I = action.payload.item.indexNote//In case the note is without text 
        //and has already been deleted from the server and now needs to be deleted only from client::::
        // if (I >= 0) {
        //     console.log(state.noteList);
        //     debugger
        //     // let Cnote = action.payload.currentItem//Which item delete
        //     let arr1 = [...state.dummyNoteList]
        //     arr1.splice(Cnote, 1)
        //     state.dummyNoteList = [...arr1]
        //     //delete in noteList:
        //     let arr2 = [...state.noteList]
        //     let index = action.payload.item.indexNote
        //     const deleteItem = state.noteList.indexOf(state.noteList.find(x => x.indexNote == index))
        //     if (deleteItem !== -1) {
        //         debugger
        //         arr2.splice(deleteItem, 1)
        //     }
        //     state.noteList = [...arr2]
        //     console.log(state.noteList);
        //     return
        // }
        // let note = action.payload
        console.log(state.noteList);
=======
        let note = action.payload
>>>>>>> 35d37c27d95852d577dfa3387e35e3581ccf3f31
        let index = action.payload.indexNote
        if (index == undefined)// ||if(action.payload.textNote)
            index = action.payload.item.indexNote;
        let arr = [...state.noteList]
        const deleteItem = state.noteList.indexOf(state.noteList.find(x => x.indexNote == index))
        if (deleteItem !== -1) {
<<<<<<< HEAD
            debugger
=======
>>>>>>> 35d37c27d95852d577dfa3387e35e3581ccf3f31
            arr.splice(deleteItem, 1)
        }
        state.noteList = [...arr]
        console.log(state.noteList);
        //missing delete index in dummyNoteList When the note saved in this list!!!!!!!
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

        allNote.push({ _id: "", indexNote: c, userName: "", createNote: "", textNote: "", placeX: left, placeY: top, colors: "#FFEB3B", check: "", flagColor: false, })
        state.noteList = [...allNote]

    },
<<<<<<< HEAD
    setDummyNoteList(state, action) {
        debugger
        let note = action.payload.note_to_delete.indexNote
        state.dummyNoteList.push(note)
        console.log(state.dummyNoteList);
    },
    // placeNote(state, action) {
    //     debugger
=======
    // placeNote(state, action) {
>>>>>>> 35d37c27d95852d577dfa3387e35e3581ccf3f31
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


<<<<<<< HEAD
    // }
=======
    // },
    setDummyNoteList(state, action) {
        debugger
        let note = action.payload.noteToDelete.indexNote
        state.dummyNoteList.push(note)
        console.log(state.dummyNoteList);
    },

    deleteNoteAction(state, action) { 
        const updateNoteList = state.noteList.filter(x => x._id !==action.payload.noteToDelete._id)
        state.noteList = updateNoteList;
    },
>>>>>>> 35d37c27d95852d577dfa3387e35e3581ccf3f31
};

export default produce((state, action) => createReducer(state, action, noteData), initialState);