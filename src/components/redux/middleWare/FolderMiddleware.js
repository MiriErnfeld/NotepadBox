import { actions } from '../actions/action'


export const folderMiddleware = ({ getState, dispatch }) => (next) => (action) => {
    let url = window.location;
    let userName = (url.pathname.split('/')[1]);
    if (action.type == "GET_USER_FOLDER") {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "cf_ob_info=502:653dc5431dd14c13:AMS; cf_use_ob=0");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`https://box.dev.leader.codes/api/${userName}/note/getNotesByUserName`, requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(actions.setAllFoldersForUser(result))
            })
            .catch(error => console.log('error', error));

    }
    if (action.type === "CREATE_FOLDER") {debugger
        debugger
        let url = window.location;
        let user = (url.pathname.split('/')[1]);
        //    var myHeaders.append(): {
        //         'Content-Type': 'application/json',
        //        ' Authorization':' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmWEpmZzJSNnBrUzdvUFkydEtiNUlQTXdEU2IyIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMjM1NzQ4OX0.blk6OJdgrkzW1rIiKkmAPTiF7KHp1nA7Ojs9cMf2zrc',
        //       },
        var myHeaders = new Headers();
        //jwt from userName miri!!!!
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
        myHeaders.append("Content-Type", "application/json");

        var folder = JSON.stringify({
            "folderName": action.payload,
          
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:folder,
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/miri/folder/addFolder`, requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger
                console.log(result)
                dispatch(actions.addFolder(result));

            })
            .catch(error => console.log('error', error));
    }




    return next(action)
}