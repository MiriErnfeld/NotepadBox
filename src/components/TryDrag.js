import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDotsת, BsCheck } from "react-icons/bs";
import { FaGalacticSenate, FaGripHorizontal } from "react-icons/fa";
import { Rnd } from "react-rnd";

import icon from '../images/icon.png'
import { LightenDarkenColor } from 'lighten-darken-color';
import { actions } from './redux/actions/action'
import './myNote.css'
import $ from 'jquery'
import Draggable from 'react-draggable';

export default function TryDrag() {
    const [noteList,setNoteList] = useState([{
        check: "",
        colors: "#FFEB3B",
        createNote: "2021-06-29T07:00:12.305Z",
        flagColor: "false",
        indexNote: 0,
        placeX: 596,
        placeY: 185,
        textNote: "hhghgh",
        userName: "60c1f21f7b1b09ba0067bc8f",
        _id: "60dac4fca6d62e805f4e68a8"
    }]);
    const [leftNote, setLeftNote] = useState()

    const dispatch = useDispatch()

    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];
    function ddd() { debugger }

    function openCloseEditor(item) {
        debugger
        let currentIndex = noteList.indexOf(noteList.find(x => x.indexNote == item.indexNote))//find the current place in the state in redux
        // --search item with editor open 
        for (let index = 0; index < noteList.length; index++) { ///find the preview open editor
            if (noteList[index].flagColor === true && index != currentIndex) {
                debugger
                dispatch(actions.closePreview(index))
            }
        }
        dispatch(actions.setFlagColor(item))
    }
    function deleteItem(item) {
        dispatch(actions.deleteNote(item))//delete note in midlleWare
    }
    function changeColor(c, item, index) {
        dispatch(actions.setCheck(index)) // index from the checked color
        dispatch(actions.setCurrentItem(item))
        debugger
        dispatch(actions.updateNote({ item, c }));//a function use to update color & text ib midlleWare
        debugger
        dispatch(actions.changeColorAction({ c, item }))
        let i = item.indexNote//2//1
        let correctIndex = noteList.indexOf(noteList.find(x => x.indexNote == i))//find the current place in the state in redux
        let currentclass = `note ${i}`
        let currentclassText = `textarea ${i}`
        let note = document.getElementsByClassName(currentclass)[0]
        let text = document.getElementsByClassName(currentclassText)[0]
        note.style.backgroundColor = c
        text.style.backgroundColor = c
    }
    function saveText(item, newText) {
        if (newText !== "") {
            const i = item.indexNote
            let currentItem = noteList.indexOf(noteList.find(x => x.indexNote == i))//find the current place in the state in redux
            debugger
            if (noteList[currentItem].textNote) {
                dispatch(actions.updateNote({ item, newText }));//to update note in midllaware
            }
            else {
                dispatch(actions.createNote1({ item, newText }));//to update in midlleWare when there is the first change
                dispatch(actions.createNote({ item, newText }));//to update in redux
            }
        }
    }
    function inResize(item, end) {
        debugger
        if (item.flagColor == true)
            dispatch(actions.setFlagColor(item))
        // if (end === 1) {
        //     debugger
        //     let x = item.placeX
        //     let place=x+3
        //     $("curr-container").css("left", place)
        // }
    }
    function handleDoubleClick(event) { event.target.select(); }

    const onDragStart = (e, id) => {
        // e.dataTransfer.setData("text/plain", id)
// debugger
    }
    const handleDragEnter = e => {
        e.stopPropagation();
        // debugger
    };
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        debugger
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        e.stopPropagation();
        // debugger
    };
    const handleDrop = e => {

        e.preventDefault();
        // e.stopPropagation();
        // setNoteList([])
        // debugger
        alert()
    };
   
    return (
        <>
            <div className="row dragfolder droppable" style={{width:"1000px"}} onDrop={handleDrop} onDragOver={handleDragOver}   >
                {/* <div className="row "> */}
                {/* <img src={folserPlus} alt="img" style={{ zoom: 0.8, color: "#7B7D70", marginTop: "3px" }}></img> */}
                {/* <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus> */}
                <p className="folder" style={{ fontSize: '15' }}>drag notes to create folder</p>
            </div>

            {/* <div onDragStart={onDragStart} style={{ backgroundColor: "red", width: "50px", height: "50px" }} draggable="true"></div> */}
            <div className="all-notes">
                {noteList ? noteList.map((item) => {
                    debugger;
                    return <>  <div className="resize" draggable>
                        {/* // style={{height:"100%",width:"100%"}} */}
                        <Rnd cancel="textarea" disableDragging
                            onResizeStart={() => { inResize(item, 0) }}
                            onResizeEnd={() => { inResize(item, 1) }}
                            // onResizeStop={setresize}
                            
                            // bounds={{ top: "90%"}}
                            // disabled={false}
                            // onDragStop={(e, d) => { ddd({ x: d.x, y: d.y }) }}
                            key={item.indexNote}
                            className={`note ${item.indexNote}`}
                            default={{
                                position: "absolute",
                                backgroundColor: item.colors,
                                x: item.placeX,
                                y: item.placeY,
                                width: 150,
                                height: 150
                            }}
                        >
                            <div className={`header ${item.indexNote}`}
                                style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }}
                            >
                                <BsX style={{
                                    color: "#0A102E",
                                    hoverBackground: "black",
                                    cursor: "auto",
                                    position: "relative",
                                    float: "left",
                                    margin: "1%"
                                    // marginTop: "2%"
                                }} onClick={() => deleteItem(item)} className="BsX_button"></BsX>
                                <img src={icon} alt="Icon" draggable="false" style={{
                                    fontWeight: "none",
                                    color: "#0A102E",
                                    margin: "1%",
                                    // marginTop: "2%"
                                }}></img>
                                <BsPencil
                                    onClick={() => openCloseEditor(item)}
                                    style={{
                                        color: "#0A102E",
                                        position: "relative",
                                        float: "right",
                                        margin: "1%",
                                        cursor: "auto",
                                        // marginTop: "2%"
                                    }} className="BsPencil_button"
                                >
                                </BsPencil>
                                <textarea
                                    className={`textarea ${item.indexNote}`}
                                    style={{ backgroundColor: item.colors }}
                                    id="areaText"
                                    type="string"
                                    onBlur={e => saveText(item, e.target.value)}
                                    onDoubleClick={handleDoubleClick}
                                >{item.textNote}
                                </textarea>
                            </div>
                            <div className="curr-container"
                                style={{
                                    // left: item.placeY
                                }}
                            >
                                {(item.flagColor === true) ?
                                    <div className="curr" >
                                        {mycolors.map((c, i) => {
                                            debugger
                                            return <div key={i} className="divColors " className="colorDiv handPointer"
                                                style={{ backgroundColor: c }} onClick={() => changeColor(c, item, i)}
                                            >
                                                {c === item.colors ?
                                                    <BsCheck
                                                        style={{
                                                            fontSize: "13px",
                                                            marginTop: " 2px",
                                                            color: "white",
                                                            fontWeight: "bold"
                                                        }}></BsCheck> : ""}
                                            </div>
                                        })}
                                    </div>
                                    : ""}
                            </div>
                        </Rnd>
                    </div>
                    </>
                })
                    : <p>No Notes</p>
                }
            </div>
      
        </>
    )
}