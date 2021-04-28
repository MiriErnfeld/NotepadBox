import React, { useState } from 'react';
import ReactStickies from 'react-stickies'; //ES6

export default function MyFirstStickyNotes(){
const [note, setNote] = useState([])

function onSave () {
    // Make sure to delete the editorState before saving to backend
    const notes = this.state.notes;
    notes.map(note => {
      delete note.editorState;
    })
    // Make service call to save notes
    // Code goes here...
  }
  onChange (notes) {
    this.setState({ // Update the notes state
      notes
    })
  }
}


class MyFirstStickyNotes extends Component {
 
    onSave () {
      // Make sure to delete the editorState before saving to backend
      const notes = this.state.notes;
      notes.map(note => {
        delete note.editorState;
      })
      // Make service call to save notes
      // Code goes here...
    }
    onChange (notes) {
      this.setState({ // Update the notes state
        notes
      })
    }
    return (
      <ReactStickies
        notes={this.state.notes}
        onChange={this.onChange}
      />
    )
  }
};