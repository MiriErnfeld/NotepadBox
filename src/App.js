import logo from './logo.svg';
import './App.css';
import './components/styles.css'
import NotePad from './components/NotePad'
import React, { useState } from 'react';
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import MyFirstStickyNotes from './components/StickyNote'

import { SketchPicker } from 'react-color'

function App() {
  const [click, setclick] = useState(false)

  function showColors() {
    debugger
    setclick(!click)
  }
  return (
    <div className="App">
      <button onClick={showColors}>...</button>
      {click ?
        <SketchPicker /> : " "}
      <MyFirstStickyNotes></MyFirstStickyNotes>
      {/* <ReactStickyNotes
        noteWidth={"140px"}
        noteHeight={"140px"}
      /> */}
      {/* <NotePad></NotePad> */}
    </div>
  );
}

export default App;
