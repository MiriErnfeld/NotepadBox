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
            })
            .catch(error => console.log('error', error));

    }

  
   
    return next(action)
}