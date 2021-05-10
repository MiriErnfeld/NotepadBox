import logo from './logo.svg';
import './App.css';
import './components/styles.css'
import NotePad from './components/NotePad'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import MyFirstStickyNotes from './components/StickyNote'
import Board from './components/notes3'
import Conva from './components/conva'
import Colors from './components/colorPallete'
import Notes from './components/myNote'
import store from './components/redux/store'


function App() {

  return (

    <Provider store={store}>
      <div className="App">

        {/* <Colors></Colors> */}
        <Notes></Notes>
        {/* <MyFirstStickyNotes></MyFirstStickyNotes> */}
        {/* <ReactStickyNotes
        noteWidth={"140px"}
        noteHeight={"140px"}
      /> */}

        {/* <Board count={50}></Board> */}
        {/* <NotePad></NotePad> */}
        {/* <Conva></Conva> */}
      </div>
      </Provider>

  );
}

export default App;
