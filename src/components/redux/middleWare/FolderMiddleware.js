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
        fetch(`https://box.dev.leader.codes/api/${userName}/folder/getFoldersByUserName`)
            .then(response => response.json())
            .then(result => {
                dispatch(actions.setAllFoldersForUser(result))
                // if (result && result.folders[0] && result.folders[0].folderName === "בישולים") {
                dispatch(actions.getFolderNotesByUser(result.folders[0]._id));
                // }
            })
            .catch(error => console.log('error', error));

    }
    if (action.type == "DELETE_FOLDER") {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/miri/folder/${action.payload}/deleteFolder`, requestOptions)
            .then(response => response.json())
            .then(result => {
                dispatch(actions.setAllFoldersForUser(result))
            })
            .catch(error => console.log('error', error));
    }

    if (action.type == "GET_FOLDER_NOTES_BY_USER") {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://box.dev.leader.codes/api/${userName}/folder/${action.payload}/folderNotes`, requestOptions)
            .then(response => response.json())
            .then(result => dispatch(actions.getAllNotesForUser(result)))
            .catch(error => console.log('error', error));
    }

    return next(action)
}