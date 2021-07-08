import { actions } from '../actions/action'


export const getData = ({ getState, dispatch }) => (next) => (action) => {
    let url = window.location;
    let userName = (url.pathname.split('/')[1]);

    if (action.type == "CREATE_NOTE1") {
        var myHeaders = new Headers();
        //jwt from userName miri!!!!
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "indexNote": action.payload.item.indexNote,
            "userName": "",
            "textNote": action.payload.newText,
            "colors": action.payload.item.colors,
            "placeX": action.payload.item.placeX,
            "placeY": action.payload.item.placeY,
            "flagColor": false,
            "check": action.payload.item.check,
            "folderId": action.payload.currentFolder._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/${userName}/note/createNote`, requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(actions.createNote(result));
            })
            .catch(error => console.log('error', error));
    }

    if (action.type == "DELETE_NOTE") {
        var check = action.payload.item.newText;
        var index = action.payload.item.indexNote
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({ id: action.payload.currentFolder._id })
        };

        if (check == "") {//from save text function
            debugger
            index = action.payload.item.indexNote
        }

        fetch(`https://box.dev.leader.codes/api/${userName}/note/${index}/deleteNote`, requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger
                if (check == "") {// after note delete only from server dispatch to reducer
                    dispatch(actions.setDummyNoteList(result.folder))//enter to dummyNoteList only the index of this note
                    return next(action)
                }
                dispatch(actions.getAllNotesForUser(result.folder))//reducer
            })
            .catch(error => console.log('error', error));
    }

    if (action.type == "UPDATE_NOTE") {

        var index = action.payload.item.indexNote
        var myHeaders = new Headers();
        // my:
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({

            "textNote": action.payload.newText,
            "placeX": action.payload.left,
            "placeY": action.payload.top,
            "colors": action.payload.c,
            // "check": action.payload.check //if want that the check color saved
            "currentFolder":action.payload.currentFolder._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/${userName}/note/${index}/updateNote`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                dispatch(actions.updateNoteAction(result))
            })
            .catch(error => console.log('error', error));

    }
    if (action.type == "NOTE_TO_SPESIFIC_FOLDER") {

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "cf_ob_info=502:653dc5431dd14c13:AMS; cf_use_ob=0");
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(action.payload),
            redirect: 'follow'
        };

        fetch("https://box.dev.leader.codes/api/note/enterNoteToFolder", requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger
                if (!result.status)
                    dispatch(actions.getAllNotesForUser(result))
            })
            .catch(error => console.log('error', error));
    }

    return next(action)
}