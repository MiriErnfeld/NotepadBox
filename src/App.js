import './App.css';
import React from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Configurator from './components/configurator'
import store from './components/redux/store'


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Configurator></Configurator>
       
      </div>
    </Provider>
  );
}

export default App;

