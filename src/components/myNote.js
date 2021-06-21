

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


export default function Notes() {

    const noteList = useSelector(state => state.reducerNote.noteList)
    const data = useSelector(state => state.reducerNote)
    const [leftNote, setLeftNote] = useState()

    const dispatch = useDispatch()

    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];

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

    return (
        <>
            <div className="all-notes">
                {noteList ? noteList.map((item) => {
                    debugger;
                    return <>  <div className="resize">
                        <Rnd
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
                                    left: "-27%"
                                }} onClick={() => deleteItem(item)} className="BsX_button"></BsX>
                                <img src={icon} alt="Icon" style={{
                                    fontWeight: "none",
                                    color: "#0A102E"
                                }}></img>
                                <BsPencil
                                    onClick={() => openCloseEditor(item)}
                                    style={{
                                        color: "#0A102E",
                                        position: "relative",
                                        right: "-27%",
                                        cursor: "auto"
                                    }} className="BsPencil_button"></BsPencil>
                                <textarea
                                    className={`textarea ${item.indexNote}`}
                                    style={{ backgroundColor: item.colors }}
                                    id="areaText"
                                    type="string"
                                    onBlur={e => saveText(item, e.target.value)}
                                >{item.textNote}
                                </textarea>
                            </div>
                            <div className="curr-container"
                                style={{
                                    x: item.placeX + item.placeY,
                                    y: item.placeY - "50"
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