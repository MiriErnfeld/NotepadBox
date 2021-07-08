import React, { useState, useEffect, useRef } from 'react'
import './configurator.css'
import { actions } from '../components/redux/actions/action';
import folserPlus from '../images/folder-plus.png'
import { useDispatch, useSelector } from 'react-redux'
import { FiFolderPlus, FiFolder, FiMoreVertical } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import { FcPlus } from "react-icons/fc";
import { BsFillPlusCircleFill } from "react-icons/bs";
import MyNote from './myNote';
import { BsX } from "react-icons/bs";
import { Modal, Button, Dropdown } from 'react-bootstrap'
var Color = require('color');

export default function Configurator() {

    const dispatch = useDispatch();
    const folders = useSelector(state => state.reducerFolder.folders);
    const newFolder = useSelector(state => state.reducerFolder.newFolder);

    {/* //not use::::::: */ }
    // const [countCol, setCountCol] = useState(0)

    const [arrnums, setarrnums] = useState([{}])
    const [currentNote, setCurrentNote] = useState();
    const [newFolderFlag, setNewFolderFlag] = useState();
    // 
    const [currentFolder, setCurrentFolder] = useState();
    const [show, setShow] = useState(false);
    const [draggedNote, setDraggedNote] = useState({});
    const [dragFlag, setDragFlag] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dropRef = useRef();
    // const dragRef=useRef();
    const divDrop = dropRef.current;

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

    function onDragEnter(e) {
        // e.target.style.backgroundColor = "#F1F1F3";

        divDrop.style.backgroundColor = "#F1F1F3";
        let note=document.getElementsByClassName(`note ${currentNote} note`);
        console.log(note);

        note[0].style.transform ="scale(0.4)";
        // alert(draggedNote)
        // draggedNote.style.class="draggedNote";
        setDragFlag(!dragFlag);
    }


    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        e.stopPropagation();
    };

    function onDropNewFolder(e) {
        divDrop.style.backgroundColor = "white";

        e.preventDefault();
        e.stopPropagation();
        setNewFolderFlag(!newFolderFlag);
        // setDragFlag(!dragFlag);
    };


    function noteToSpesificFolder(targetFolderId){
        dispatch(actions.noteToSpesificFolder({
            sourceFolder: currentFolder,
            targetFolder: targetFolderId,
            indexNote: currentNote
        }))
    }

    function onDropExistsFolder(e, targetFolderId) {
        e.preventDefault();
        e.stopPropagation();
        noteToSpesificFolder(targetFolderId);
    };

    async function createFolder(e) {
        let text = e.target.value;
        if (text === "") {
            text = "new folder";
        }
        await dispatch(actions.createFolder(text));
        // console.log(newFolder);
        debugger
        noteToSpesificFolder(newFolder._id)
        setNewFolderFlag(!newFolderFlag);
    }

    function insertNote() {
        dispatch(actions.setNoteList());
    }

    function updateFolder(e, id) {
        dispatch(actions.updateFolder({ id, folderName: e.target.value }))
        e.target.readOnly = true;
        e.target.autoFocus = false;
    }

    function deleteFolder() {
        debugger
        dispatch(actions.deleteFolder(currentFolder._id));
        handleClose();
    }

    function setDeleteFolder(e, folder) {
        e.stopPropagation()
        setCurrentFolder(folder);
        handleShow();
    }

    function setCurrentNoteOnDrag(indexNote) {
        // console.log(draggedNote1);
        setCurrentNote(indexNote);
        // setDraggedNote(draggedNote1);
        console.log(currentNote);
        console.log(draggedNote);
    }

    function getFolderNotesByUser(folder) {
        // debugger
        setCurrentFolder(folder);
        dispatch(actions.getFolderNotesByUser(folder._id));
    }

    return (
        <>
            <div className="container-notes">
                <div className="configurator-line row justify-content-start d-flex ">
                    <p className="my-notes col-2">My Notes:</p>
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
                <MyNote setCurrentNote={setCurrentNoteOnDrag} currentFolder={currentFolder} dragFlag={dragFlag} currentNote={currentNote} />
                {/* <NoteResize></NoteResize> */}
                {/* </div> */}


            </div >
            <div className="container container-configurator d-flex align-items-center flex-column start custom-scrollbar" >
                {/* <div className="container container-configurator"> */}
                <div className="create-note-button m-2 mt-3 d-flex justify-content-center align-items-center"
                    onClick={insertNote}>
                        <p className="text-justify text-center m-auto">Create Note +</p></div>
                <div className="row dragfolder droppable m-2 p-3 justify-content-center align-items-center"
                    ref={dropRef}
                    onDragEnter={onDragEnter}
                    onDrop={onDropNewFolder}
                    onDragOver={handleDragOver}  >
                    {/* <div className="row "> */}
                    <img src={folserPlus} alt="img" style={{ zoom: "100%", color: "#7B7D70" }}></img>
                    {/* <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus> */}
                    <p className="newFolder" style={{ fontSize: '15' }}>drag notes to create folder</p>
                </div>
                {
                    newFolderFlag ? <div className="folder folderColor d-flex justify-content-around align-items-center">
                        <FiFolder className="icon"></FiFolder>
                        <input type="text" className="folderInput" style={{ cursor: "auto" }} id="folderInput" placeholder="Folder name"
                            onBlur={createFolder}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    createFolder(event);
                                }
                            }}></input>
                    </div> : ""
                }
                {
                    folders ? folders.map((folder) => {
                        return <>
                            <div key={folder._id}
                                className={`folder m-2 d-flex justify-content-around px-5 align-items-center ${currentFolder && folder._id===currentFolder._id?  'folderChosenColor':'folderColor'}`}
                                onClick={(e) => getFolderNotesByUser(folder)}
                                onDrop={(e) => onDropExistsFolder(e, folder._id)}
                                onDragOver={handleDragOver}>
                                <FiFolder className="icon"></FiFolder>
                                <input type="text" className="folderInput" readOnly defaultValue={folder.folderName}
                                    onBlur={(e) => { updateFolder(e, folder._id) }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            updateFolder(e, folder._id)
                                        }
                                    }}
                                    onDoubleClick={(e) => { e.target.readOnly = false }}
                                ></input>
                                <RiDeleteBinLine className="icon"
                                    onClick={(e) => setDeleteFolder(e, folder)} >
                                </RiDeleteBinLine>
                            </div>
                        </>
                    })
                        : ""}

            </div>
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