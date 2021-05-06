import { actions } from '../actions/action'


export const getData = ({ dispatch, getState }) => next => action => {
    if (action.type == "INIT-DATA") {
        let url = window.location;
        let userName = (url.pathname.split('/')[1]);
        return fetch(`https://${userName}/getNoteByUserName`,
            {
                method: 'GET',
                // headers: { 'authorization': jwt }
            })
            .then((result) => {
                debugger
                dispatch(actions.setUser(result));
            })
    } 
    return next(action)
}