

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


export default function Notes(props) {

    const noteList = useSelector(state => state.reducerNote.noteList)
    const data = useSelector(state => state.reducerNote)
    const reduxCheck = useSelector(state => state.reducerNote.check)
    const reduxCurrentItem = useSelector(state => state.reducerNote.currentItem)

    const [CcurrentItem, setCcurrentItem] = useState()
    const [Ccheck, setCcheck] = useState()
    const [yes, setYes] = useState()
    const [CFlagColor, setCFlagColor] = useState()
    const [Cindex, setCindex] = useState()
    const [size, setsize] = useState()
    const [leftNote, setLeftNote] = useState()

    const [style, setstyle] = useState({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0"
      })

    const { arrnums, } = props
    const nums = [30, 7, 0, 9, 60, 4, 40, 14, 6, 70, 18, 29, 10, 2,]
    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];

    const dispatch = useDispatch()
    // useEffect(() => {
    //     alert("dataCheck   !!!" + (JSON.stringify(reduxCheck)) + "in state   ::" + (JSON.stringify(Ccheck)))

    //     setCcheck(reduxCheck)
    // }, [reduxCheck])
    // useEffect(() => {
    //     alert("dataCurrentItem   !!!" + reduxCurrentItem + "in state   ::" + CcurrentItem)

    //     setCcurrentItem(reduxCurrentItem)
    // }, [reduxCurrentItem])
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
        console.log(Ccheck);
        dispatch(actions.setCurrentItem(item))
        setCcurrentItem(item)
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
                    return <> <Rnd
                    className={`note ${item.indexNote}`}
                    style={{
                                    position: "absolute",
                                    backgroundColor: item.colors,
                                    top: item.placeX,
                                    left: item.placeY
                                }}
                    // style={{backgroundColor:item.colors,
                    // width:"50px",height:"50px"}}
                    default={{
                      x: 0,
                      y: 0,
                      width: 320,
                      height: 200
                    }}
                  >
                    Rnd
                  </Rnd>
                    <Draggable>
                        
                        <div className="resize" draggable={false}>
                            <div draggable={false}
                                key={item.indexNote} className={`note ${item.indexNote}`}
                                style={{
                                    position: "absolute",
                                    backgroundColor: item.colors,
                                    top: item.placeX,
                                    left: item.placeY
                                }}
                            >
                                <div className={`header ${item.indexNote}`} draggable={false}
                                    style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }}
                                >
                                    <BsX style={{
                                        color: "#0A102E",
                                        hoverBackground: "black",
                                        cursor: "auto",
                                        position: "relative",
                                        left: "-30%"
                                        // marginTop: "-8%"
                                    }} onClick={() => deleteItem(item)}></BsX>
                                    <img src={icon} alt="Icon" style={{
                                        fontWeight: "none",
                                        // marginTop: "4%",
                                        color: "#0A102E"
                                    }}></img>
                                    <BsPencil
                                        // onMouseEnter={e => closeEditor(item)}
                                        onClick={() => openCloseEditor(item)}
                                        style={{
                                            color: "#0A102E",
                                            position: "relative",
                                            right: "-30%",
                                            // marginLeft: "-8%",
                                            // marginTop: "-7%",
                                            // paddingBottom: "3px",
                                            cursor: "auto"
                                        }}></BsPencil>
                                    <textarea draggable={false}
                                        className={`textarea ${item.indexNote}`}
                                        style={{ backgroundColor: item.colors }}
                                        id="areaText"
                                        type="string"
                                        onBlur={e => saveText(item, e.target.value)}
                                    >{item.textNote}
                                    </textarea>
                                </div>
                            </div>
                            <div className="curr-container"
                                style={{
                                    top: item.placeX,
                                    left: item.placeY
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
                        </div>
                    </Draggable></>
                })
                    : <p>No Notes</p>
                }
            </div>
        </>
    )
}