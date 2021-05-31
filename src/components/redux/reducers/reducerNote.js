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
        debugger
        state.noteList = (action.payload.notes);
        debugger
        console.log(state.noteList[0].flagColor);
        console.log(state.noteList);
    },
    updateNoteAction(state, action) { // from midlleWare 
        debugger
        // let c = state.noteList.indexOf(state.noteList.find(note => note.indexNote === i))
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
        allNote.push({ _id:"",indexNote: c, userName: "", createNote: "", textNote: "",  placeX: "", placeY: "", colors: "#FFEB3B",check: false, flagColor: false, })
        state.noteList = [...allNote]
    },
    setFlagColor(state, action) {  //set flagColor only to true from component myNote.js
        debugger
        let x = action.payload.indexNote
        let currentFlag = state.noteList[x].flagColor
        let arr = [...state.noteList]
        if (currentFlag == "false") {
            arr[x].flagColor = "true"
            debugger
            console.log(arr[x].flagColor);
        }
        else
            arr[x].flagColor = "false"
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