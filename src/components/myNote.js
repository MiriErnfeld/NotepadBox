

import React, { useState, useEffect } from 'react'
import Rotation from 'react-rotation'
import { ResizeProvider, ResizeConsumer } from "react-resize-context";
import { zoomIn, zoomOut } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDotsת, BsCheck } from "react-icons/bs";
import { TiZoomOutline } from "react-icons/ti";
import { FaGalacticSenate, FaGripHorizontal } from "react-icons/fa";
import icon from '../images/icon.png'
import { LightenDarkenColor } from 'lighten-darken-color';
import { actions } from './redux/actions/action'

import './myNote.css'
import $ from 'jquery'
import Draggable from 'react-draggable';

const styles = {
    zoomIn: {
        animation: 'x 50s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    }
}

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

        // --search item with editor open 
        for (let index = 0; index < noteList.length; index++) { ///find the preview open editor
            if (noteList[index].flagColor == true && index !== item.indexNote)
                dispatch(actions.closePreview(index))
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
    function setPlace(e, Cx, Cy, item) {
        debugger
        //   dispatch(actions.updateNote({ item, c }));
        let x = Cx / 5 + 'vh'
        let y = Cy / 5 + '%'
        dispatch(actions.updateNote({ x, y, item }));
        debugger
        dispatch(actions.placeNote({ x, y, item }))
        debugger
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
    function zoomIn(item) {
        debugger
        let i = item.indexNote//2//1
        let currentclass = `note ${i}`
        let note = document.getElementsByClassName(currentclass)[0]
        note.style.zoom = "1.8"
    } 
    function zoomOut(item) {
        debugger
        let i = item.indexNote//2//1
        let currentclass = `note ${i}`
        let note = document.getElementsByClassName(currentclass)[0]
        note.style.zoom = "1.0"
    }
    return (
        <>
            <div className="all-notes">

                {noteList ? noteList.map((item) => {
                    debugger;
                    return <Draggable>
                        {/* <ResizeProvider>
                            <ResizeConsumer> */}
                        <div
                            key={item.indexNote} className={`note ${item.indexNote}`}
                            style={{
                                backgroundColor: item.colors,
                                top: item.placeX,
                                left: item.placeY
                            }}
                            onDragLeave={(e) => setPlace(e, e.clientX, e.clientY, item)}
                        >
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
                                <img src={icon} alt="Icon" style={{ marginTop: "-16px", fontWeight: "none", color: "#0A102E" }}></img>
                                {/* <BsPencil
                                        onClick={() => rotateItem(item)}></BsPencil> */}
                                {/* <FaGripHorizontal ></FaGripHorizontal> */}
                                {/* {item.indexNote} */}
                                <BsX style={{
                                    color: "#0A102E",
                                    hoverBackground: "black",
                                    marginRight: "123px",
                                    paddingBottom: "3px",
                                    cursor: "auto",
                                    marginTop: "-15px"
                                }} onClick={() => deleteItem(item)}></BsX>
                                {/* <TransformWrapper> <TransformComponent> */}
                                <textarea
                                    className={`textarea ${item.indexNote}`}
                                    // value={item.textNote}
                                    style={{ backgroundColor: item.colors }}
                                    id="areaText"
                                    type="string"
                                    onBlur={e => saveText(item, e.target.value)}
                                >{item.textNote}
                                </textarea>
                                <div
                                    style={{ backgroundColor: item.colors }}
                                >
                                    {/* <TiZoomOutline></TiZoomOutline> */}
                                    <FiZoomOut
                                        style={{ marginLeft: "72%" }}
                                        onClick={() => zoomOut((item))}></FiZoomOut>
                                    <FiZoomIn
                                        style={styles.bounce}
                                        className="zoonIn"
                                        onClick={() => zoomIn((item))}></FiZoomIn>
                                </div>  {/* </TransformComponent>      </TransformWrapper> */}
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

                        {/* </ResizeConsumer>
                        </ResizeProvider> */}
                        {/* </textarea> */}

                    </Draggable>
                })
                    : <p>No Notes</p>}

            </div>
        </>
    )
}