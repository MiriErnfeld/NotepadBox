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

        fetch("https://box.dev.leader.codes/api/miri/note/getNotesByUserName", requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger;
                console.log(result)
                dispatch(actions.getAllNotesForUser(result))
                debugger
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




        // debugger
        // var settings = {
        //     "url": "http://localhost:3008/createNote/miri",
        //     "method": "POST",
        //     "timeout": 0,
        //     "headers": {
        //       "Content-Type": "application/json"
        //     },
        //     "data": JSON.stringify({
        //       "textNote": "6666666666666666",
        //       "indexNote": "66"
        //     }),
        //   };

        //   $.ajax(settings).done(function (response) {
        //     console.log(response);
        //   });

        // fetch("http://localhost:3008/createNote/miri", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        //     .then((data) => data.json())
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((err) => console.log(err));





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
}