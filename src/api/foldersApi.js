export async function createFolderApi(text) {
    let url = window.location;
    let userName = (url.pathname.split('/')[1]);
    var myHeaders = new Headers();
    //jwt from userName miri!!!!
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0a3F0Q2RBM0Z4Y2dNYzBQOHJ6Tk90eTR3ejAzIiwiZW1haWwiOiJtaXJpQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMzY1NTA5N30.u8PdX0AXdt7qyIP1XmmXgxq4wAdxBdaI_cRpvhJ8ATQ");
    myHeaders.append("Content-Type", "application/json");
    var folder = JSON.stringify({
        "folderName": text,
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: folder,
        redirect: 'follow'
    };

    let result = await fetch(`https://box.dev.leader.codes/api/${userName}/folder/addFolder`, requestOptions)
    .then(response => response.json())
    .then(result => {
    if (!result.status)
            return result
    })
    return result;

}





