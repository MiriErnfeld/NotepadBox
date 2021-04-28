import React, { useState, useEffect } from 'react';
import ReactStickies from 'react-stickies'; //ES6
import $ from 'jquery'

export default function MyFirstStickyNotes() {
    const [myNote, setMyNote] = useState([])

    let r = $('<div id="note">666</div>')
    $(".title div").replaceWith(r)

    function onSave() {
        // Make sure to delete the editorState before saving to backend
        const notes = myNote;
        notes.map(myNote => {
            delete myNote.editorState;
        })
        // Make service call to save notes
        // Code goes here...
    }
    function onChange(notes) {
        debugger
        console.log(myNote)
        console.log(notes)
        debugger
        setMyNote(notes)
    }
    return (
        <ReactStickies
            notes={myNote}
            onChange={onChange}
        />
    )
}
