import React, { useState } from 'react';
import ReactStickies from 'react-stickies'; //ES6

export default function MyFirstStickyNotes() {
    const [note, setNote] = useState([])

    function onSave() {
        // Make sure to delete the editorState before saving to backend
        const notes = note;
        notes.map(note => {
            delete note.editorState;
        })
        // Make service call to save notes
        // Code goes here...
    }
    function onChange(notes) {
        setNote(notes)
    }
    return (
        <ReactStickies
            notes={note}
            onChange={onChange}
        />
    )
}
