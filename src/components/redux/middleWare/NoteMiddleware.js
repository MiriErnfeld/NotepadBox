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
    if (action.type == "CREATE-NOTE") {
        debugger
        return fetch(`https://createNote/${userName}`),
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                // headers: { 'authorization': jwt }
            }
                .then((result) => {
                    debugger
                    console.log(result)
                })
                .catch((error) => { console.log("errorrrrr:" + error); })
    }
    return next(action)
}