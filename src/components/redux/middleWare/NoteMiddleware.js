import { actions } from '../actions/action'
import $ from 'jquery'


export const getData = ({ dispatch, getState }) => next => action => {
    let url = window.location;
    let userName = (url.pathname.split('/')[1]);
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

        fetch(`https://box.dev.leader.codes/api/${userName}/note/getNotesByUserName`, requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger
                console.log(result);
                dispatch(actions.getAllNotesForUser(result))
            })
            .catch(error => console.log('error', error));

    }
    if (action.type == "CREATE_NOTE1") {
        debugger
        let url = window.location;
        let user = (url.pathname.split('/')[1]);
        //    var myHeaders.append(): {
        //         'Content-Type': 'application/json',
        //        ' Authorization':' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmWEpmZzJSNnBrUzdvUFkydEtiNUlQTXdEU2IyIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMjM1NzQ4OX0.blk6OJdgrkzW1rIiKkmAPTiF7KHp1nA7Ojs9cMf2zrc',
        //       },
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIU0tMa3lEQVV1ZmxJeXVQaWdwblowQ09aazMzIiwiZW1haWwiOiJ0ZWhpbGFzaGFwaXJhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMjM2NjA5OH0.4j7QUvkXLS-FKqvurFR-VnP4FtfQdyBk9NlSzv_WbXQ");
        myHeaders.append("Content-Type", "application/json");
        debugger
        var raw = JSON.stringify({
            "indexNote": action.payload.item.indexNote,
            "userName": "",
            "textNote": action.payload.newText,
            "colors": action.payload.item.colors,
            "placeX": action.payload.item.placeX,
            "placeY": action.payload.item.placeY,
            "flagColor": false,
            "check": action.payload.item.check
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/${user}/note/createNote`, requestOptions)
            .then(response => response.text())
            .then(result => {
                debugger;
                console.log(result)
                dispatch(actions.setUser(user))
                debugger
            })
            .catch(error => console.log('error', error));


    }
    if (action.type == "DELETE_NOTE") {
        debugger
        var index = action.payload.indexNote
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIU0tMa3lEQVV1ZmxJeXVQaWdwblowQ09aazMzIiwiZW1haWwiOiJ0ZWhpbGFzaGFwaXJhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMjM2NjA5OH0.4j7QUvkXLS-FKqvurFR-VnP4FtfQdyBk9NlSzv_WbXQ");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/${userName}/note/${index}/deleteNote`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                debugger
                dispatch(actions.DeleteNoteAction(result))
            })
            .catch(error => console.log('error', error));
    }
    if (action.type == "UPDATE_NOTE") {
        debugger
        var index = action.payload.item.indexNote
        var myHeaders = new Headers();
        // my:
        // myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmWEpmZzJSNnBrUzdvUFkydEtiNUlQTXdEU2IyIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMjM1NzQ4OX0.blk6OJdgrkzW1rIiKkmAPTiF7KHp1nA7Ojs9cMf2zrc");
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIU0tMa3lEQVV1ZmxJeXVQaWdwblowQ09aazMzIiwiZW1haWwiOiJ0ZWhpbGFzaGFwaXJhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMjM2NjA5OH0.4j7QUvkXLS-FKqvurFR-VnP4FtfQdyBk9NlSzv_WbXQ");
        myHeaders.append("Content-Type", "application/json");
        debugger
        var raw = JSON.stringify({
            "textNote": action.payload.newText,
            // "placeX": action.payload.placeX,
            // "placeY": action.payload.placeY,
            "colors": action.payload.c
        });
        debugger
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        debugger
        fetch(`https://box.dev.leader.codes/api/tehilaSH/note/${index}/updateNote`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                debugger
                dispatch(actions.updateNoteAction(result))
                debugger
            })
            .catch(error => console.log('error', error));

    }
    return next(action)
}