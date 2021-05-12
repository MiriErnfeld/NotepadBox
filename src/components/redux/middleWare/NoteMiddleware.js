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
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "textNote": "4 note"
        // });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/createNote/miri")

            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));




        return fetch(`https://createNote/${userName}`),
        {
            method: 'POST',
            body:JSON.stringify({
            "textNote":
        });
                // headers: { 'authorization': jwt }
            })
            .then((result) => {
                debugger
                dispatch(actions.setUser(result));
            })
    }
return next(action)
}