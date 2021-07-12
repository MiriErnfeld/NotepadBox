import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd';

import { BsPencil, BsX, BsCheck } from "react-icons/bs";
import { Rnd } from "react-rnd";
import icon from '../images/icon.png'
import { LightenDarkenColor } from 'lighten-darken-color';
import { actions } from './redux/actions/action'
import update from 'immutability-helper';
import ItemTypes from './ItemTypes';
import Box from './Box';


import './myNote.css'

const styles = {
    width: 300,
    height: 300,
    border: '1px solid black',
    position: 'relative',
};


export default function Notes(props) {

    const { setCurrentNote, dragFlag, currentNote, currentFolder } = props;
    const noteList = useSelector(state => state.reducerNote.noteList)
    const data = useSelector(state => state.reducerNote)
    const [leftNote, setLeftNote] = useState()

    //TryDnd---------------------------------------------------------------

    const [notes, setNotes] = useState();
    const [notes1, setNotes1] = useState([]);
    const moveNote = useCallback((id, left, top) => {
        console.log(id);
        console.log(left);
        console.log(top);

        // setNotes1(notes.map(key,item)=>(item._id===id? return {...item,[left]:left,[top]:top}:item))
        setNotes1(update(notes1, {
            ["_id"]: {
                $merge: { left, top },
            },
        }));
    }, [notes1, setNotes1]);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            console.log(item);
            moveNote(item._id, left, top);
            return undefined;
        },
    }), [moveNote]);

    //TryDnd---------------------------------------------------------------

    // const dragRef = useRef();
    const rndRef = useRef();

    const dispatch = useDispatch()

    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];

    useEffect(() => {
        let rnd = rndRef.current;
        dragFlag ? rnd.updateSize({ width: "30%", height: "30%" }) : console.log();
        let allNotes = [...noteList];

        allNotes = allNotes.map(obj => ({ ...obj, top: 20, left: 80 }));

        console.log(allNotes);
        setNotes1([...allNotes]);
        // setNotes1("ooo");
        console.log(notes1);
        console.log(noteList);
    }, [dragFlag, noteList])

    function openCloseEditor(item) {
        let currentIndex = noteList.indexOf(noteList.find(x => x.indexNote == item.indexNote))//find the current place in the state in redux
        // --search item with editor open 
        for (let index = 0; index < noteList.length; index++) { ///find the preview open editor
            if (noteList[index].flagColor === true && index != currentIndex) {
                dispatch(actions.closePreview(index))
            }
        }
        dispatch(actions.setFlagColor(item))
    }
    function deleteItem(item) {
        debugger
        const i = item.indexNote
        // console.log(data);
        let correctItem = data.dummyNoteList.indexOf(data.dummyNoteList.find(x => x == i))//find the current place in the dummyNoteList in redux if the note delete only from server
        if (correctItem != -1 || item.textNote == "" || item._id == "") { //In case one of the options is up there is no need to contact the server
            dispatch(actions.deleteOnlyFromClient(item))//dispatch to deleteOnlyFromClient function in reducer
            // alert("correctItem != -1 || item.textNote =empty||item._id ==empty ")
            return
        }
        dispatch(actions.deleteNote({ item, currentFolder }))//delete note in midlleWare 
    }

    function changeColor(c, item, index) {
        dispatch(actions.setCheck(index)) // index from the checked color
        dispatch(actions.setCurrentItem(item))
        dispatch(actions.updateNote({ item, c, currentFolder }));//a function use to update color & text ib midlleWare
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
        debugger
        if (newText) {
            const i = item.indexNote
            let currentItem = noteList.indexOf(noteList.find(x => x.indexNote == i))//find the current place in the state in redux
            debugger
            if (noteList[currentItem].textNote) {
                dispatch(actions.updateNote({ item, newText, currentFolder }));//to update note in midllaware
            }
            else {
                debugger
                dispatch(actions.createNote1({ item, newText, currentFolder }));//to update in midlleWare when there is the first change
                // dispatch(actions.createNote({ item, newText }));//to update in redux
            }
        }
        else {
            if (item._id == "") { //In case the note is not yet saved in the database and the text is empty
                debugger
                return;
            }
            dispatch(actions.deleteNote({ item, newText, currentFolder }))//delete note in midlleWare
        }
    }
    function inResize(item, end) {
        if (item.flagColor == true)
            dispatch(actions.setFlagColor(item))
    }

    function handleDoubleClick(e) { e.target.select(); }

    function handleDragStop(e) {
        console.log();
        console.log(document.getElementById("rnd"))
        // document.getElementById("rnd").dispatchEvent(new DragEvent('onDragStop'));
    }

    function onDragStart(indexNote) {
        // const draggedNote = dragRef.current;
        // console.log(draggedNote);
        setCurrentNote(indexNote);
    }
    function onDragStop(e) {
        debugger
        console.log(e);
        document.getElementById("rnd").dispatchEvent(new Event('mousedown'));

    }

    return (
        <>
            <div className="all-notes">
                <div ref={drop} style={styles}>
                    {notes1.length>0 ? notes1.map((item, key) => {console.log(item);
                        // const { left, top, ...note } = notes[key];
                        return (<div className="resize">
                            <Box key={key} id={item._id} left={item.left} top={item.top} hideSourceOnDrag={true}>
                                <div className={`header ${item.indexNote}`}
                                    // style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }} 
                                    >
                                    <BsX style={{
                                        color: "#0A102E",
                                        hoverBackground: "black",
                                        cursor: "auto",
                                        position: "relative",
                                        float: "left",
                                        margin: "1%"
                                    }} onClick={() => deleteItem(item)} className="BsX_button"></BsX>
                                    <img src={icon} alt="Icon" draggable="false" style={{
                                        fontWeight: "none",
                                        color: "#0A102E",
                                        margin: "1%",
                                    }}></img>
                                    <BsPencil
                                        onClick={() => openCloseEditor(item)}
                                        style={{
                                            color: "#0A102E",
                                            position: "relative",
                                            float: "right",
                                            margin: "1%",
                                            cursor: "auto",
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
                            </Box></div>);
                    })
                        : <p>No Notes</p>
                    }

                </div>);


                {/* {notes ? notes.map((item) => {
                    return <>  <div className="resize">
                        <Rnd id="rnd" ref={rndRef} cancel="textarea .curr-container BsX BsPencil" draggable
                            onResizeStart={() => { inResize(item, 0) }}
                            onResizeEnd={() => { inResize(item, 1) }}
                            onDragStart={() => onDragStart(item.indexNote)}
                            onDragStop={handleDragStop}
                            // onDragStop={onDragStop}
                            key={item.indexNote}
                            // ref={dragRef}
                            className={`note ${item.indexNote} note`}
                            default={{
                                position: "absolute",
                                backgroundColor: item.colors,
                                x: item.placeX,
                                y: item.placeY,
                                width: 150,
                                height: 150
                            }}
                        // style={{ zoom: dragFlag&&currentNote===item.indexNote ? '30%' : "100%" }}

                        >

                            <div className={`header ${item.indexNote}`}
                                style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }} >
                                <BsX style={{
                                    color: "#0A102E",
                                    hoverBackground: "black",
                                    cursor: "auto",
                                    position: "relative",
                                    float: "left",
                                    margin: "1%"
                                }} onClick={() => deleteItem(item)} className="BsX_button"></BsX>
                                <img src={icon} alt="Icon" draggable="false" style={{
                                    fontWeight: "none",
                                    color: "#0A102E",
                                    margin: "1%",
                                }}></img>
                                <BsPencil
                                    onClick={() => openCloseEditor(item)}
                                    style={{
                                        color: "#0A102E",
                                        position: "relative",
                                        float: "right",
                                        margin: "1%",
                                        cursor: "auto",
                                    }} className="BsPencil_button"
                                >
                                </BsPencil>
                                <h4>{item.indexNote}</h4>
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
                                }}
                            >
                                {(item.flagColor === true) ?
                                    <div className="curr" >
                                        {mycolors.map((c, i) => {
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
                } */}
            </div>
        </>
    )
}