import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { extractJwt, getStaticData } from './middleware/crudMiddleware'
// import staticDetailsReducer from './reducers/staticDetailsReducer'
import reducerNote from './reducers/reducerNote'


const reducer = combineReducers({ reducerNote });

const store = createStore(reducer);
window.store = store;
export default store;
store.dispatch({ type: 'INIT-DATA' });