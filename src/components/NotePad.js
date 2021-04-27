import React, { useState } from "react";
import './styles.css'

export default function NotePad() {

    const [notesText, setNotesText] = useState("")
    const [noteList, setNoteList] = useState([])

    function onSaveNotes() {
        debugger
        const notes = notesText
        // document.getElementById("notes-value").value;
        const obj = { notes };
        setNotesText("")
        setNoteList(noteList.concat(obj))
        console.log("noteList", noteList);
    }

    function onChangeValue(e) {
        debugger
        const notes = e
        setNotesText(notes)
    }

    function onDeleteNote(index) {
        debugger
        const deleteNotes = noteList.filter(noteList, index);
        console.log(deleteNotes)
        setNoteList(deleteNotes);
    }

    return (
        <div className="Note-pad">
            <div className="some-test">
                <div>
                    <textarea
                        rows="5"
                        cols="35"
                        placeholder="Enter Notes here"
                        id="notes-value"
                        value={notesText}
                        onChange={(e) => onChangeValue(e.target.value)}
                    />
                    <button className="save-button" onClick={onSaveNotes}>
                        +
            </button>
                </div>
            </div>
            <div className="display-notes">
                {noteList.length > 0
                    ? noteList.map((item, index) => (
                        <div key={index} className={`notes-item ${index}`}>
                            <div className="note-head">
                                <h3>Note {index}</h3>
                                <button
                                    className="delete-note"
                                    onClick={() => onDeleteNote(index)}
                                >
                                    X
                    </button>
                            </div>
                            {item.notes}
                        </div>
                    ))
                    : ""}
            </div>
        </div>
    );
}


