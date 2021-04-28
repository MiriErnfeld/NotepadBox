import React, { useState, useEffect } from 'react';
import ReactStickies from 'react-stickies'; //ES6
import { SketchPicker } from 'react-color'
import $ from 'jquery'

export default function MyFirstStickyNotes() {
    const [myNote, setMyNote] = useState([])
    const [click, setclick] = useState(false)

    function showColors() {
        debugger
        setclick(!click)
    }

    let r = $('<button className="btn-colors">...</button>')
    $('.btn-colors').on("click", showColors)
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
    return (<>

        {click ?
            <SketchPicker /> : " "}
        <ReactStickies
            notes={myNote}
            onChange={onChange}
        />
    </>
    )
}
