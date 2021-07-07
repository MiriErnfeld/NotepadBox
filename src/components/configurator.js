import React, { useState, useEffect } from 'react'
import './configurator.css'
import { actions } from '../components/redux/actions/action';
import folserPlus from '../images/folder-plus.png'
import { useDispatch, useSelector } from 'react-redux'
import MyNote from './myNote';
import { BsX } from "react-icons/bs";
import { FiFolder } from "react-icons/fi";
import { Modal, Button, Dropdown } from 'react-bootstrap'
var Color = require('color');

export default function Configurator() {

    const dispatch = useDispatch();
    const folders = useSelector(state => state.reducerFolder.folders);
    const [currentNote, setCurrentNote] = useState();
    const [newFolder, setNewFolder] = useState();
    const [currentFolder, setCurrentFolder] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        folders && folders[0] ?
            setCurrentFolder(folders[0]) :
            console.log("not contain folders");
    }, [folders])

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        e.stopPropagation();
    };

    function onDropNewFolder(e) {
        e.preventDefault();
        e.stopPropagation();
        setNewFolder(!newFolder);
    };

    function onDropExistsFolder(e, targetFolderId) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(actions.noteToSpesificFolder({
            sourceFolder: currentFolder._id,
            targetFolder: targetFolderId,
            indexNote: currentNote
        }))
    };

    async function createFolder(event) {
        let text = event.target.value;
        if (text === "") {
            text = "new folder";
        }
        await dispatch(actions.createFolder(text));
        setNewFolder(!newFolder);
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
        setCurrentNote(indexNote)
    }

    function getFolderNotesByUser(folder) {
        setCurrentFolder(folder);
        dispatch(actions.getFolderNotesByUser(folder._id));
    }

    return (
        <>
            <div className="container-notes">
                <div className="configurator-line row justify-content-start d-flex ">
                    <p className="my-notes col-2">My Notes:</p>
                </div>
                <MyNote setCurrentNote={setCurrentNoteOnDrag} currentFolder={currentFolder} />

            </div >
            <div className="container container-configurator d-flex align-items-center flex-column start custom-scrollbar" >
                <div className="create-note-button m-2 mt-3 text-justify text-center" onClick={insertNote}>Create Note +</div>
                <div className="row dragfolder droppable m-2" onDrop={onDropNewFolder} onDragOver={handleDragOver}  >
                    <img src={folserPlus} alt="img" style={{ zoom: 0.8, color: "#7B7D70", marginTop: "3px" }}></img>
                    <p className="newFolder" style={{ fontSize: '15' }}>drag notes to create folder</p>
                </div>
                {
                    newFolder ? <div className="folder d-flex justify-content-around align-items-center">
                        <FiFolder className="icon"></FiFolder>
                        <input type="text" id="folderInput" placeholder="Folder name" className="folderInput"
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
                            <div key={folder._id} className="folder m-2 d-flex justify-content-around align-items-center"
                                onClick={(e) => getFolderNotesByUser(folder)}
                                onDrop={(e) => onDropExistsFolder(e, folder._id)} onDragOver={handleDragOver}>
                                <FiFolder className="icon"></FiFolder>
                                <input type="text" className="folderInput" readOnly defaultValue={folder.folderName}
                                    onBlur={(e) => { updateFolder(e, folder._id) }}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            updateFolder(e, folder._id)
                                        }
                                    }}
                                    onDoubleClick={(e) => { e.target.readOnly = false }}
                                ></input><BsX onClick={(e) => setDeleteFolder(e, folder)} className="BsX_button"></BsX>
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