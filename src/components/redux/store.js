import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { extractJwt, getStaticData } from './middleware/crudMiddleware'
// import staticDetailsReducer from './reducers/staticDetailsReducer'
import reducerNote from './reducers/reducerNote'
import reducerFolder from './reducers/reducerFolder'
import { getData } from './middleWare/NoteMiddleware'
import { folderMiddleware } from './middleWare/FolderMiddleware';



const reducer = combineReducers({ reducerNote,reducerFolder });

// const store = createStore(reducer, applyMiddleware(getData)));
const store = createStore(reducer, composeWithDevTools(applyMiddleware(getData,folderMiddleware)));
window.store = store;
export default store;
store.dispatch({ type: 'INIT_DATA' });
store.dispatch({type:"GET_USER_FOLDER"})