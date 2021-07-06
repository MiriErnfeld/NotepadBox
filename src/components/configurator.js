import React, { useState, useEffect } from 'react'
import './configurator.css'
import { actions } from '../components/redux/actions/action';
import folserPlus from '../images/folder-plus.png'
import { useDispatch, useSelector } from 'react-redux'
import { FiFolderPlus, FiFolder, FiMoreVertical } from "react-icons/fi";
import { FcPlus } from "react-icons/fc";
import { BsFillPlusCircleFill } from "react-icons/bs";
import MyNote from './myNote';
import { BsX } from "react-icons/bs";
import { Modal, Button, Dropdown } from 'react-bootstrap'
var Color = require('color');



export default function Configurator() {

    const dispatch = useDispatch();
    const folders = useSelector(state => state.reducerFolder.folders);

    {/* //not use::::::: */ }
    // const [countCol, setCountCol] = useState(0)
    const [arrnums, setarrnums] = useState([{}])
    const [currentNote, setCurrentNote] = useState();
    // 
    const [currentFolder, setCurrentFolder] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        folders && folders[0] ?
            setCurrentFolder(folders[0]) :
            console.log("not contain folders");
    }, [folders])

    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }
    {/* //not use::::::: */ }
    // function addCol() {
    //      
    //     if (countCol == 4) {

    //         $('.p-cloumn').css("display", "none")
    //     }
    //     let cnt = countCol + 1

    //     if (countCol < 5) {
    //         setCountCol(cnt)
    //     }

    // }
    {/* //not use::::::: */ }
    // function changeStyle(index) {
    //      
    //     $('.inputTitle' + index).css("backgroundColor", "#F1F1F3");
    //     $('.inputTitle' + index).css("font-weight", "bold");
    //     $('.inputTitle' + index).css("text-align", "center");
    // }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        e.stopPropagation();
    };
    function handleDrop(e, targetFolderId) {
        debugger
        e.preventDefault();
        e.stopPropagation();
        dispatch(actions.noteToSpesificFolder({
            sourceFolder: currentFolder._id,
            targetFolder: targetFolderId,
            indexNote: currentNote
        }))
    };

    function insertNote() {

        dispatch(actions.setNoteList());
    }

    function deleteFolder() {
        dispatch(actions.deleteFolder(currentFolder._id));
        handleClose();
    }

    function setDeleteFolder(e, folder) {
        e.stopPropagation()
        setCurrentFolder(folder);
        handleShow();
    }

    function setCurrentNoteOnDrag(indexNote) {
        setCurrentNote(indexNote)
    }

    function getFolderNotesByUser(folder) {
        setCurrentFolder(folder);
        dispatch(actions.getFolderNotesByUser(folder._id));
    }

    return (
        <>
            {/* <DragDropContext
                onDragEnd={onDropbb} > */}

            <div className="container-notes">
                <div className="configurator-line row justify-content-start d-flex ">
                    <p className="my-notes col-2">My Notes:</p>
                    {/* <div className="create-note" onClick={insertNote}>Create Note +</div> */}

                    {/* //not use::::::: */}

                    {/* {countCol > 0 ? <div class="col-2"> <input type="text" className="inputTitle1" onChange={e => changeStyle(1)} /> </div> : ""}

                    {countCol > 1 ? <div className="col-2">
                        <input type="text" className="inputTitle2" onChange={e => changeStyle(2)} />    </div> : ""}

                    {countCol > 2 ? <div className="col-2">
                        <input type="text" className="inputTitle3" onChange={e => changeStyle(3)} />   </div> : ""}

                    {countCol > 3 ? <div className="col-2">
                        <input type="text" className="inputTitle4" onChange={e => changeStyle(4)} />    </div> : " "}

                    {countCol > 4 ? <div className="col-2">
                        <input type="text" className="inputTitle5" onChange={e => changeStyle(5)} /> </div> : " "} */}
                    {/* <p className="p-cloumn col-2" onClick={addCol}>
                        new coloumn
                    <BsFillPlusCircleFill className="plus-icon" ></BsFillPlusCircleFill>
                    </p> */}
                </div>


                {/* //not use::::::: */}

                {/* <div class="row">
                        <div class="col-sm-2" style={{ borderRight: "4px solid #dee2e6", height: "80%" }}>
                        </div>
                        {countCol > 0 ? <div class="col-sm-2   " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : " "}
                        {countCol > 1 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : ""}
                        {countCol > 2 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : ""}
                        {countCol > 3 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : ""}
                    </div> */}
                {/* <div class="row"> */}
                <MyNote setCurrentNote={setCurrentNoteOnDrag} currentFolder={currentFolder}/>
                {/* <NoteResize></NoteResize> */}
                {/* </div> */}


            </div >
            <div className="container container-configurator d-flex align-items-center flex-column start"  >
                {/* <div className="container container-configurator"> */}
                <div className="create-note-button m-2 mt-3" onClick={insertNote}>Create Note +</div>
                <div className="row dragfolder droppable m-2" onDrop={handleDrop} onDragOver={handleDragOver}  >
                    {/* <div className="row "> */}
                    <img src={folserPlus} alt="img" style={{ zoom: 0.8, color: "#7B7D70", marginTop: "3px" }}></img>
                    {/* <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus> */}
                    <p className="newFolder" style={{ fontSize: '15' }}>drag notes to create folder</p>
                </div>
                {
                    folders ? folders.map((folder) => (
                        <div key={folder._id}
                            onClick={(e) => getFolderNotesByUser(folder)}
                            onDrop={(e) => handleDrop(e, folder._id)} onDragOver={handleDragOver}

                            className="folder m-2 d-flex justify-content-around align-items-center">
                            <FiFolder ></FiFolder>
                            <p>{folder.folderName}</p>
                            <div><BsX onClick={(e) => setDeleteFolder(e, folder)} className="BsX_button"></BsX></div>
                        </div>
                    ))
                        : ""}
                {/* <div onDragStart={onDragStart} style={{backgroundColor:"red",width:"50px", height:"50px"}} draggable="true"></div> */}
                {/* <div draggable="true"> */}

                {/* </div> */}


                {/* <Droppable > */}
                {/* <div className="row " >
                        <FiFolder ></FiFolder>
                        folder name
                    </div> */}

            </div>
            {/* </DragDropContext> */}

            {/* modal to delete folder */}
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton>
                    <Modal.Title>מחיקת תקייה </Modal.Title>
                </Modal.Header>
                <Modal.Body>שים לב מחיקת התקייה תמחק אוטומטית את כל הפתקים המשוייכים אליה...!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        בטל                    </Button>
                    <Button variant="primary" onClick={deleteFolder}>
                        מחק                     </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}