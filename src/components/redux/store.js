import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { extractJwt, getStaticData } from './middleware/crudMiddleware'
// import staticDetailsReducer from './reducers/staticDetailsReducer'


// const reducer = combineReducers({ staticDetailsReducer });

// const store = createStore(reducer, applyMiddleware(extractJwt, getStaticData));
window.store = store;
export default store;
store.dispatch({ type: 'INIT-DATA' });