import { actions } from '../actions/action'


export const getData = ({ dispatch, getState }) => next => action => {
    if (action.type == "INIT_DATA") {

        let url = window.location;
        let userName = (url.pathname.split('/')[1]);
        return fetch(`https://${userName}/getNoteByUserName`,
            {
                method: 'GET',
                // headers: { 'authorization': jwt }
            })
            .then((result) => {

                dispatch(actions.setUser(result));
            })
    }
    if(action.type=="CREATE_NOTE")
    {
        fa
    }
    // if (action.type == "CREATE_NOTE") {
    //     debugger

    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //         "textNote": action.payload
    //     });

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("http://localhost:3008/createNote/miri", requestOptions)
    //         .then(response => response.json())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // }
    return next(action)
}