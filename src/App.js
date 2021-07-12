import './App.css';
import React from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Configurator from './components/configurator'
import store from './components/redux/store'
import Container from './components/Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Bucket} from './components/TryDndBasic/TryDndBasic';
import Box from './components/TryDndBasic/TryDndBasic';


function App() {

  return (
    <Provider store={store}>
       <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Configurator></Configurator>
        {/* <Container/> */}
        {/* <Bucket></Bucket>
        <Box/> */}
      </div>
      </DndProvider>
    </Provider>
  );
}

export default App;

