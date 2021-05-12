import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { extractJwt, getStaticData } from './middleware/crudMiddleware'
// import staticDetailsReducer from './reducers/staticDetailsReducer'
import reducerNote from './reducers/reducerNote'
import {getData} from './middleWare/NoteMiddleware'


const reducer = combineReducers({ reducerNote});

const store = createStore(reducer,applyMiddleware(getData));
window.store = store;
export default store;
// store.dispatch({ type: 'INIT-DATA' });