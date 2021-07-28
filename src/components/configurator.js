import React, { useState, useEffect, useRef } from 'react'
import './configurator.css'
import { actions } from '../components/redux/actions/action';
import folserPlus from '../images/folder-plus.png'
import { useDispatch, useSelector } from 'react-redux'
import { FiFolderPlus, FiFolder, FiMoreVertical } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import interact from 'interactjs';

import { createFolderApi } from '../api/foldersApi';
import { FcPlus } from "react-icons/fc";
import { BsFillPlusCircleFill } from "react-icons/bs";
// import MyNote from './TrySmoothDnd';
// import MyNote from './TryDrag';
// import MyNote from './myNote copy';
import MyNote from './myNote';
import { BsX } from "react-icons/bs";
import { Modal, Button, Dropdown } from 'react-bootstrap';

var Color = require('color');

export default function Configurator() {

    const dispatch = useDispatch();
    const folders = useSelector(state => state.reducerFolder.folders);
    const newFolder = useSelector(state => state.reducerFolder.newFolder);

    {/* //not use::::::: */ }
    // const [countCol, setCountCol] = useState(0)

    const [arrnums, setarrnums] = useState([{}])
    const [currentNote, setCurrentNote] = useState(null);
    const [newFolderFlag, setNewFolderFlag] = useState(false);
    // 
    const [currentFolder, setCurrentFolder] = useState(null);
    const [show, setShow] = useState(false);
    const [draggedNote, setDraggedNote] = useState({});
    const [draggedNoteFlag, setDraggedNoteFlag] = useState();
    const [defaultFolder, setDefaultFolder] = useState(null);
    const [sizeScreen, setSizeScreen] = useState();

    // const [dragNewFolder, setDragNewFolder] = useState();
    // const [dragExistsFolder, setDragExistsFolder] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dropRef = useRef();
    // const dragRef=useRef();
    const divDrop = dropRef.current;

    useEffect(async () => {
        if (folders && folders[0]) {
            let defaultF = folders.find(f => f.folderName === "default");
            console.log(defaultF);
            await setCurrentFolder(defaultF);
            await setDefaultFolder(defaultF);
            console.log(currentFolder);
            console.log(currentNote);
        }

    }, [folders,newFolderFlag,currentNote])

    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }

    function setCurrentNote1(note) {
        setCurrentNote(note);
    }

    // function onDragEnter(e) {
    //     // e.target.style.backgroundColor = "#F1F1F3";

    //     divDrop.style.backgroundColor = "#F1F1F3";
    //     let note = document.getElementsByClassName(`note ${currentNote} note`);
    //     console.log(note);

    //     note[0].style.transform = "scale(0.4)";
    //     // alert(draggedNote)
    //     // draggedNote.style.class="draggedNote";
    //     setDragFlag(!dragFlag);
    // }


    // function handleDragOver(e) {
    //     e.preventDefault();
    //     e.dataTransfer.dropEffect = 'copy';
    //     e.stopPropagation();
    // };

    // function onDropNewFolder(e) {
    //     divDrop.style.backgroundColor = "white";

    //     e.preventDefault();
    //     e.stopPropagation();
    //     setNewFolderFlag(!newFolderFlag);
    //     // setDragFlag(!dragFlag);
    // };


    function noteToSpesificFolder(targetFolderId) {
        console.log(currentNote);
        if (currentNote >= 0 && currentFolder)
            dispatch(actions.noteToSpesificFolder({
                sourceFolder: currentFolder._id,
                targetFolder: targetFolderId,
                indexNote: folders.find(f=>f._id===currentNote).indexNote
            }))
        // else
        //     alert("you cannot move note without text!")
        // e.stopPropagation();
    }

    // function onDropExistsFolder(e, targetFolderId) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     noteToSpesificFolder(targetFolderId);
    // };

    async function createFolder(e) {
        let text = e.target.value;
        if (text === "") {
            text = "new folder";
        }
        const result = await createFolderApi(text);
        if (result) {
            dispatch(actions.addFolder(result));
            dispatch(actions.setNewFolder(result));
            noteToSpesificFolder(result.newFolder._id);
            setNewFolderFlag(false);
        }
        e.stopPropagation();
    }

    function insertNote() {
        console.log(sizeScreen);
        debugger
        dispatch(actions.setNoteList1(sizeScreen));
    }

    function updateFolder(e, id) {
        dispatch(actions.updateFolder({ id, folderName: e.target.value }))
        e.target.readOnly = true;
        e.target.autoFocus = false;
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

    // function setCurrentNoteOnDrag(indexNote) {
    //     // console.log(draggedNote1);
    //     setCurrentNote(indexNote);
    //     // setDraggedNote(draggedNote1);
    //     console.log(currentNote);
    //     console.log(draggedNote);
    // }

    function getFolderNotesByUser(folder) {
        debugger
        setCurrentFolder(folder);
        dispatch(actions.getFolderNotesByUser(folder._id));
    }

    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.2,

        // listen for drop related events:

        ondropactivate: function (event) {
            // add active dropzone feedback
            // event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {
            // setDraggedNoteFlag(!draggedNoteFlag);
            var draggableElement = event.relatedTarget
            var dropzoneElement = event.target

            // feedback the possibility of a drop
            event.target.classList.add('drop-active')
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('can-drop')

            console.log(currentNote);
            // let note = document.getElementsByClassName(`note ${currentNote}`);
            // console.log(note);

            // note[0].style.transform = "scale(0.4)";



            // draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            // event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: async function (event) {
            console.log("dropppppp");
            event.stopImmediatePropagation();

            // e.preventDefault();
            // e.stopPropagation();
            let note = event.relatedTarget;
            debugger
            if (note) {
                let currentNoteId = note.getAttribute('data-key');
                if (currentNoteId) {
                    await setCurrentNote(currentNoteId);
                    note.classList.add("currentNote");
                }
            }
            let droppedDiv = event.target.getAttribute('data-key');
            // if (droppedDiv && droppedDiv === "newFolder") {
            //     setNewFolderFlag(true);
            // }
            if (droppedDiv) {
                noteToSpesificFolder(droppedDiv);
            }
            // noteToSpesificFolder(targetFolderId);
            // event.relatedTarget.textContent = 'Dropped'
            setDraggedNoteFlag(!draggedNoteFlag);


        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    })
    interact('.dropNewFolder').dropzone({
        // only accept elements matching this CSS selector
        accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.5,

        // listen for drop related events:

        ondropactivate: function (event) {
            // add active dropzone feedback
            // event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {
            // setDraggedNoteFlag(!draggedNoteFlag);
            var draggableElement = event.relatedTarget
            var dropzoneElement = event.target

            // feedback the possibility of a drop
            event.target.classList.add('drop-active')
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('can-drop')

            console.log(currentNote);
            // let note = document.getElementsByClassName(`note ${currentNote}`);
            // console.log(note);

            // note[0].style.transform = "scale(0.4)";



            // draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            // event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: async function (event) {
            // e.preventDefault();
            // event.stopPropagation();
            // event.stopImmediatePropagation();
            let note = event.relatedTarget;
            let currentNoteId = note.getAttribute('data-key');
            console.log(currentNoteId);
            if (note) {
                await setCurrentNote(currentNoteId);
                note.classList.add("currentNote")
            }
            debugger
            let droppedDiv = event.target.getAttribute('data-key');
            if (droppedDiv && droppedDiv === "newFolder") {
              await setNewFolderFlag(true)
            
                console.log(newFolderFlag);
            }
            
            // noteToSpesificFolder(targetFolderId);
            // event.relatedTarget.textContent = 'Dropped'
            setDraggedNoteFlag(!draggedNoteFlag);

        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    })

    function setSizeScreenFromChild(sizeScreen) {
        setSizeScreen(sizeScreen);
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
                {/* <MyNote setCurrentNote={setCurrentNoteOnDrag} currentFolder={currentFolder} dragFlag={dragFlag} currentNote={currentNote} /> */}
                <MyNote draggedNoteFlag={draggedNoteFlag} currentFolder={currentFolder} currentNote={currentNote} setCurrentNote={setCurrentNote1} setSizeScreen={setSizeScreenFromChild} />
                {/* <NoteResize></NoteResize> */}
                {/* </div> */}


            </div >
            <div className="container container-configurator d-flex align-items-center flex-column start custom-scrollbar" >
                {/* <div className="container container-configurator"> */}
                <div className="create-note-button m-2 mt-3 d-flex justify-content-center align-items-center"
                    onClick={insertNote}>
                    <p className="text-justify text-center m-auto">Create Note +</p></div>
                <div className="dropNewFolder row dragfolder m-2 p-3 justify-content-center align-items-center"
                    ref={dropRef}
                    // onDragEnter={onDragEnter}
                    // onDrop={onDropNewFolder}
                    // onDragOver={handleDragOver}
                    data-key="newFolder"
                >

                    {/* <div className="row "> */}
                    {/* <RiFolderAddLine style={{ zoom: "1.5", color: "#7B7D70" }}></RiFolderAddLine> */}
                    {/* <img src={folserPlus} alt="img" style={{ zoom: "100%", color: "#7B7D70" }}></img> */}
                    {/* <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus> */}
                    <p className="newFolder" style={{ fontSize: '15' }}>drag notes to create folder</p>
                </div>


                {
                    newFolderFlag ? <div className="folder folderColor d-flex justify-content-around align-items-center">
                        <FiFolder className="icon"></FiFolder>
                        <input type="text" className="folderInput" id="folderInput" placeholder="Folder name"
                            onBlur={createFolder}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    createFolder(event);
                                }
                            }}></input>
                    </div> : ""
                }

                {
                    folders && defaultFolder ?

                        <div key={defaultFolder._id}
                            className={`dropzone folder m-2 d-flex justify-content-around px-5 align-items-center ${currentFolder && (defaultFolder._id === currentFolder._id) ? 'folderChosenColor' : 'folderColor'}`}
                            onClick={(e) => getFolderNotesByUser(defaultFolder)}
                            // onDrop={(e) => onDropExistsFolder(e, folder._id)}
                            // onDragOver={handleDragOver}
                            data-key={defaultFolder._id}
                        >
                            <FiFolder className="icon"></FiFolder>
                            <input type="text" className="folderInput" readOnly defaultValue={defaultFolder.folderName}

                            ></input>

                        </div>
                        : ""

                }
                {folders ? folders.map((folder) => {
                    console.log(folder._id);
                    return <>
                        {
                            folder.folderName !== "default" ?
                                <div key={folder._id}
                                    className={`dropzone folder m-2 d-flex justify-content-around px-5 align-items-center ${currentFolder && (folder._id === currentFolder._id) ? 'folderChosenColor' : 'folderColor'}`}
                                    onClick={(e) => getFolderNotesByUser(folder)}
                                    // onDrop={(e) => onDropExistsFolder(e, folder._id)}
                                    // onDragOver={handleDragOver}
                                    data-key={folder._id}
                                >
                                    <FiFolder className="icon"></FiFolder>
                                    <input type="text" className="folderInput" readOnly defaultValue={folder.folderName}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter') {
                                                updateFolder(e, folder._id)
                                            }
                                        }}
                                        onDoubleClick={(e) => { console.log('e', e); e.target.readOnly = false }}
                                        onBlur={(e) => !e.target.readOnly ?
                                            updateFolder(e, folder._id) : console.log()}
                                    ></input>
                                    {
                                        folder.folderName !== "default" ?
                                            <RiDeleteBinLine className="icon"
                                                onClick={(e) => setDeleteFolder(e, folder)} >
                                            </RiDeleteBinLine>
                                            : ""
                                    }

                                </div>


                                : ""



                        }



                    </>
                })
                    : ""
                }

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