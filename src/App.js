import logo from './logo.svg';
import './App.css';
import './components/styles.css'
import NotePad from './components/NotePad'
import React, { useState } from 'react';
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import MyFirstStickyNotes from './components/StickyNote'
import Note3 from './components/notes3'

function App() {

  return (
    <div className="App">
      {/* <MyFirstStickyNotes></MyFirstStickyNotes> */}
      {/* <ReactStickyNotes
        noteWidth={"140px"}
        noteHeight={"140px"}
      /> */}
      <Note3></Note3>
      {/* <NotePad></NotePad> */}
    </div>
  );
}

export default App;
