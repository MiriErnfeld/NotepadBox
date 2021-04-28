import logo from './logo.svg';
import './App.css';
import NotePad from './components/NotePad'
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';

function App() {
  return (
    <div className="App">
         <ReactStickyNotes />
      {/* <NotePad></NotePad> */}
    </div>
  );
}

export default App;
