import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsCheck } from "react-icons/bs";
import { Container, Draggable } from 'react-smooth-dnd';
import interact from 'interactjs';

import { Rnd } from "react-rnd";
import icon from '../images/icon.png'
import { LightenDarkenColor } from 'lighten-darken-color';
import { actions } from './redux/actions/action'
import './myNote.css'

export default function Notes(props) {

    const { setCurrentNote, dragFlag, currentNote, currentFolder, dragNewFolder, dragExistsFolder } = props;
    const noteList = useSelector(state => state.reducerNote.noteList)
    const data = useSelector(state => state.reducerNote)
    const [leftNote, setLeftNote] = useState()
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
        dragFlag ? rnd.updateSize({ width: "30%", height: "30%" }) : console.log();;
    }, [dragFlag])

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
        console.log(data);
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
        // debugger
        // let el=document.getElementById("rnd").getBoundingClientRect();
        // let elements=document.querySelectorAll('*');
        // let pos;
        // // console.log(elements);
        // elements.forEach((elem)=>{
        //     pos=elem.getBoundingClientRect();
        //     if(pos.left>=elem.left && pos.right<=elem.right){
        //         console.log("ccccccccccccccccccc");
        //     }
        //     // console.log(elem.getBoundingClientRect());
        // })
        // // console.log(el.getBoundingClientRect());
        // console.log(el);
        // console.log(el.right-el.left);

        document.getElementById("rnd").dispatchEvent(new Event('drop'));
        // document.getElementById("rnd").mousedown();

    }
    function onMouseUp(e) {
        console.log("rrrrrrrrrrrrrrrrrrrrrr");
        // document.getElementById("rnd").dispatchEvent(new Event('mousedown'));
    }
    const extendsProps = {

        ondrop: () => { console.log("ppppppppppppppppppppppppp"); },
    };
    /* The dragging code for '.draggable' from the demo above
* applies to this demo as well so it doesn't have to be repeated. */

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:

        ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {
            var draggableElement = event.relatedTarget
            var dropzoneElement = event.target

            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('can-drop')
            draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: function (event) {
            event.relatedTarget.textContent = 'Dropped'
        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    })

    interact('.drag-drop')
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            // dragMoveListener from the dragging demo above
            listeners: { move: dragMoveListener }
        })
        function dragMoveListener (event) {
            var target = event.target
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
          
            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
          
            // update the posiion attributes
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
          }
          

    return (
        <>
            <div className="all-notes">
                {noteList ? noteList.map((item) => {
                    console.log(item);
                    return <>  <div className="resize" >
                        {/* <div ref={rndRef} draggable="true" 
                        onResizeStart={() => { inResize(item, 0) }}
                        onResizeEnd={() => { inResize(item, 1) }}
                        ondragstart={() => onDragStart(item.indexNote)}
                        onDragStop={(e)=>onDragStop(e)}
                        onMouseUp={onMouseUp}
                        key={item.indexNote}
                            // ref={dragRef}
                            className={`note ${item.indexNote} note`}
                         width="336" height="69"> */}
                        {/* <Rnd id="rnd" ref={rndRef} cancel=".textarea .curr-container BsX BsPencil"
                            onResizeStart={() => { inResize(item, 0) }}
                            onResizeEnd={() => { inResize(item, 1) }}
                            onDragStart={() => onDragStart(item.indexNote)}
                            onDragStop={(e)=>onDragStop(e)}
                            onMouseUp={onMouseUp}
                            extendsProps={extendsProps}
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

                        > */}

                        {/* <div className={`header ${item.indexNote}`}
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
                                <textarea
                                    className={`textarea ${item.indexNote} textarea`}
                                    style={{ backgroundColor: item.colors }}
                                    id="areaText"
                                    type="string"
                                    onBlur={e => saveText(item, e.target.value)}
                                    onDoubleClick={handleDoubleClick}
                                >{item.textNote}
                                </textarea>
                            </div> */}
                        {/* <div className="curr-container"
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
                            </div> */}
                        {/* </Rnd> */}
                        {/* </div> */}
                    </div>
                    </>
                })
                    : <p>No Notes</p>
                }
            </div>
        </>
    )
}