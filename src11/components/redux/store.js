import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducerNote from './reducers/reducerNote'
import reducerFolder from './reducers/reducerFolder'
import { getData } from './middleWare/NoteMiddleware'
import { folderMiddleware } from './middleWare/FolderMiddleware';

const reducer = combineReducers({ reducerNote,reducerFolder });
const store = createStore(reducer, composeWithDevTools(applyMiddleware(getData,folderMiddleware)));
window.store = store;
export default store;
store.dispatch({type:"GET_USER_FOLDER"})