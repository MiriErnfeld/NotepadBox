import keyss from '../../../config/env/keys';
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
        fetch(`${keyss.BASE_URL}/${userName}/folder/getFoldersByUserName`)
            .then(response => response.json())
            .then(result => {
                debugger
                if (!result.status) {
                    dispatch(actions.setAllFoldersForUser(result))
                    dispatch(actions.getFolderNotesByUser(result.folders[0]._id));
                }
            })
            .catch(error => console.log('error', error));

    }

    if (action.type === "CREATE_FOLDER") {
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
            body: folder,
            redirect: 'follow'
        };

        fetch(`${keyss.BASE_URL}/${userName}/folder/addFolder`, requestOptions)
            .then(response => response.json())
            .then(async (result) => {
                debugger
                if (!result.status) {
                    
                    // console.log(result)
                    Promise.resolve(dispatch(actions.addFolder(result))).then(
                        () => { debugger; dispatch(actions.setNewFolder(result))
                         });
                }
            })
    }

    if (action.type == "DELETE_FOLDER") {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`${keyss.BASE_URL}/${userName}/folder/${action.payload}/deleteFolder`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!result.status) {
                    dispatch(actions.deleteFolderFromList(result));
                }
            })
            .catch(error => console.log('error', error));
    }

    if (action.type == "UPDATE_FOLDER") {
        var index = action.payload.id
        var myHeaders = new Headers();
        // my:
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
        myHeaders.append("Content-Type", "application/json");
        var folderToUpdate = JSON.stringify({
            "folderName": action.payload.folderName,
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: folderToUpdate,
            redirect: 'follow'
        };

        fetch(`${keyss.BASE_URL}/folder/${index}/updateFolder`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!result.status) {
                    console.log(result)
                    dispatch(actions.updateNoteAction(result))
                }
            })
            .catch(error => console.log('error', error));

    }

    if (action.type == "GET_FOLDER_NOTES_BY_USER") {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${keyss.BASE_URL}/${userName}/folder/${action.payload}/folderNotes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!result.status) {
                    dispatch(actions.setAllNotesFolder(result))
                }
            })
            .catch(error => console.log('error', error));
    }

    return next(action)
}