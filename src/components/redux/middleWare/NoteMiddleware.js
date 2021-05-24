import { actions } from '../actions/action'
import $ from 'jquery'


export const getData = ({ dispatch, getState }) => next => action => {
    if (action.type == "INIT_DATA") {

        let url = window.location;
        let userName = (url.pathname.split('/')[1]);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "cf_ob_info=502:653dc5431dd14c13:AMS; cf_use_ob=0");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://box.dev.leader.codes/api/miri/note/getNotesByUserName", requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger
                dispatch(actions.getAllNotesForUser(result))
            })
            .catch(error => console.log('error', error));

    }
    if (action.type == "CREATE_NOTE") {
        debugger

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({

            "textNote": action.payload,
            "indexNote": "111111"

        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://box.dev.leader.codes/api/miri/note/createNote", requestOptions)
            .then(response => response.text())
            .then(result => {
                debugger;
                console.log(result)
            })
            .catch(error => console.log('error', error));

        return next(action)
    }
    return next(action)
}