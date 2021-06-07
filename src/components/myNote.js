

import React, { useState, useEffect } from 'react'
import Rotation from 'react-rotation'
import { actions } from './redux/actions/action'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDotsת, BsCheck } from "react-icons/bs";
import { FaGalacticSenate, FaGripHorizontal } from "react-icons/fa";
import { LightenDarkenColor } from 'lighten-darken-color';
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


    const { arrnums, } = props
    const nums = [300, 7, 0, 9, 60, 4, 40, 14, 6, 70, 18, 29, 10, 2,]
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

        // --search item with editor open 
        for (let index = 0; index < noteList.length; index++) { ///find the preview open editor
            if (noteList[index].flagColor == true && index !== item.indexNote)
                dispatch(actions.closePreview(index))
        }

        dispatch(actions.setFlagColor(item))
    }
    function rotateItem(item) {

        let rotate = `note ${item.indexNote}`
        let note = document.getElementsByClassName(rotate)[0]

        note.style.transform = "rotate(90deg)";
    }
    function deleteItem(item) {
        dispatch(actions.deleteNote(item))
    }
    function changeColor(c, item, index) {

        if (Ccheck == index && CcurrentItem == item)
            setYes(1)

        dispatch(actions.setCheck(index)) // index from the checked color

        console.log(Ccheck);

        dispatch(actions.setCurrentItem(item))
        // if (reduxCheck == index && reduxCurrentItem == item) {
        //     setYes(1)

        // }

        dispatch(actions.updateNote({ item, c }));//a function use to update color & text ib midlleWare
        dispatch(actions.changeColorAction({ c, item }))

        let i = item.indexNote
        let currentItem = noteList.indexOf(noteList.find(x => x.indexNote == i))//find the current place in the state in redux
        let currentclass = `note ${currentItem}`
        let currentclassText = `textarea ${currentItem}`
        let note = document.getElementsByClassName(currentclass)[0]
        let text = document.getElementsByClassName(currentclassText)[0]
        note.style.backgroundColor = c
        text.style.backgroundColor = c
        alert(Ccheck + CcurrentItem);
    }

    // function changeNotePlace(e, index) {
    //       
    //     console.log("item.indexNote::::" + index + "top::::::" + e.target.style.top, "right::::" + e.target.style.right);
    // }

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
                {noteList ? noteList.map((item, index) =>
                    <>
                        <Draggable>
                            <div type="draggable"
                                key={index} className={`note ${item.indexNote}`}
                                style={{
                                    backgroundColor: item.colors,
                                    top: nums[item.indexNote] + 'vh',
                                    left: item.indexNote * 9 + 'vh'
                                }}>
                                {/* {data.topNote = "10%"}
                            {data.rightNote = "20%"} */}
                                <div className={`header ${item.indexNote}`}
                                    style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }}
                                >
                                    <BsPencil
                                        // onMouseEnter={e => closeEditor(item)}
                                        onClick={() => openCloseEditor(item)}
                                        style={{
                                            color: "#0A102E",
                                            marginLeft: "121px",
                                            marginTop: " 8px",
                                            paddingBottom: "3px",
                                            cursor: "auto",
                                        }}></BsPencil>
                                    <BsPencil
                                        // onMouseEnter={e => closeEditor(item)}
                                        onClick={() => rotateItem(item)}></BsPencil>
                                    <FaGripHorizontal style={{ marginTop: "-16px", fontWeight: "none", color: "#0A102E" }}></FaGripHorizontal>
                                    <BsX style={{
                                        color: "#0A102E",
                                        hoverBackground: "black",
                                        marginRight: "123px",
                                        paddingBottom: "3px",
                                        cursor: "auto",
                                        marginTop: "-15px"
                                    }} onClick={() => deleteItem(item)}></BsX>
                                    <textarea
                                        className={`textarea ${item.indexNote}`}
                                        // value={item.textNote}
                                        style={{ backgroundColor: item.colors }}
                                        id="areaText"
                                        type="string"
                                        onBlur={e => saveText(item, e.target.value)}
                                    >{item.textNote}</textarea>
                                </div>
                                <div className="curr-container">
                                    {(item.flagColor === true) ?
                                        <div className="curr" >
                                            {mycolors.map((c, i) => {
                                                return <div key={i} className="divColors " className="colorDiv handPointer"
                                                    style={{ backgroundColor: c }} onClick={() => changeColor(c, item, i)}
                                                >
                                                    {yes ?
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
                        </Draggable>
                    </>)
                    : <p>No Notes</p>}
            </div>
        </>
    )
}