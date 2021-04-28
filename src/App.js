import logo from './logo.svg';
import './App.css';
import './components/styles.css'
import NotePad from './components/NotePad'
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import MyFirstStickyNotes from './components/StickyNote'

function App() {
  return (
    <div className="App">
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
