import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsCheck } from "react-icons/bs";
import interact from 'interactjs';

import icon from '../images/icon.png'
import { LightenDarkenColor } from 'lighten-darken-color';
import { actions } from './redux/actions/action'
import './myNote.css'

export default function Notes(props) {

    const { setCurrentNote, draggedNoteFlag, currentNote, currentFolder, dragNewFolder, dragExistsFolder, setSizeScreen } = props;
    const noteList = useSelector(state => state.reducerNote.noteList)
    const data = useSelector(state => state.reducerNote)
    const [leftNote, setLeftNote] = useState()
    const [isDown, setIsDown] = useState();
    // const [dragEnd, setDragEnd] = useState();
    // const dragRef = useRef();
    const rndRef = useRef();
    const allNoteRef = useRef();

    const dispatch = useDispatch()

    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];

    // useEffect(() => {
    //     let rnd = rndRef.current;
    //     draggedNoteFlag ? rnd.updateSize({ width: "30%", height: "30%" }) : console.log();;
    // }, [draggedNoteFlag])

    useEffect(() => {
        setSizeScreen({ clientHeight: allNoteRef.current.clientHeight, clientWidth: allNoteRef.current.clientWidth });
    }, [])

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

    function savePositionNote(item, left, top, index) {
        console.log("upppppphhnn");
        // dispatch(actions.updateNote({ item, left, top,currentFolder }));//a function use to update color & text ib midlleWare
        // console.log(item);
    }

    function saveText(item, newText) {
        debugger

        if (newText) {
            const i = item.indexNote
            let currentItem = noteList.indexOf(noteList.find(x => x.indexNote == i))//find the current place in the state in redux
            debugger
            let currentDummyIndex = data.dummyNoteList.find(x => x == i)//find the current place in the state in redux
            if (noteList[currentItem].textNote && !currentDummyIndex) {
                dispatch(actions.updateNote({ item, newText, currentFolder }));//to update note in midllaware
            }
            else {
                debugger
                if (currentDummyIndex) {
                    debugger
                    dispatch(actions.deleteDummyNoteList(currentDummyIndex))
                }
                dispatch(actions.setNewNoteIndex(item.indexNote));
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

    function onDragStart(e) {
        // const draggedNote = dragRef.current;
        // console.log(draggedNote);
        let note = e.target.getAttribute("data-key");
        setCurrentNote(note.indexNote);
        // setDragEnd(false);
    }

    /* The dragging code for '.draggable' from the demo above
* applies to this demo as well so it doesn't have to be repeated. */

    // enable draggables to be dropped into this


    interact('.drag-drop')
        .draggable({
            ignoreFrom: '.textarea',
            // origin: 'self',
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: '.App',
                    endOnly: true
                })
            ],
            autoScroll: true,
            // dragMoveListener from the dragging demo above
            listeners: {
                move: dragMoveListener,
                start: onDragStart,
                // onend:savePositionNote("c","r","g")
                // ,
                // dragLeave:
            }
        }).resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true },

            listeners: {
                move(event) {
                    var target = event.target
                    var x = (parseFloat(target.getAttribute('data-x')) || 0)
                    var y = (parseFloat(target.getAttribute('data-y')) || 0)

                    // update the element's style
                    target.style.width = event.rect.width + 'px'
                    target.style.height = event.rect.height + 'px'

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left
                    y += event.deltaRect.top

                    target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                }
            },
            modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                    outer: 'all-notes'
                }),

                // minimum size
                interact.modifiers.restrictSize({
                    min: { width: 100, height: 50 }
                })
            ],

            inertia: true
        })

    interact('.dropDrag').dropzone({
        // only accept elements matching this CSS selector
        accept: '#yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 1,

      
        ondrop: function (event) {
            event.stopImmediatePropagation();

            console.log("droo");
            //   event.relatedTarget.textContent = 'Dropped'
            //    await setDragEnd(true);
            dragEndListener(event.relatedTarget);

        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    })
    function dragMoveListener(event) {
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

    function dragEndListener(target) {
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + target.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + target.dy
        console.log("end");
        let item = target.getAttribute("data-key");
        savePositionNote(item, x, y);

    }
    //   function dragEndListener(e){
    //       debugger
    //       console.log(e);
    //   }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener

    return (
        <>
            <div className="all-notes dropDrag" ref={allNoteRef}>
                {noteList ? noteList.map((item) => {
                    console.log(noteList);
                    console.log(item);
                    return <>
                        <div className="resize" >
                            {/* <div id="no-drop" class="drag-drop"> #no-drop </div> */}

                            <div key={item.indexNote}
                                id="yes-drop"
                                data-key={item}
                                className={`drag-drop note ${item.indexNote}`}
                                style={{
                                    backgroundColor: item.colors, top: item.placeX,
                                    left: item.placeY
                                }}

                            >

                                <div className={`header ${item.indexNote}`}
                                    style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }} >
                                    <BsX style={{
                                        color: "#0A102E",
                                        hoverBackground: "black",
                                        // cursor: "auto",
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
                                            // cursor: "auto",
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
                            </div>

                            {/* <div id="outer-dropzone" class="dropzone">
                            #outer-dropzone
                            <div id="inner-dropzone" class="dropzone">#inner-dropzone</div>
                        </div> */}

                            {/* <div ref={rndRef} id="drag" draggable="true"
                            onResizeStart={() => { inResize(item, 0) }}
                            onResizeEnd={() => { inResize(item, 1) }}
                            onMouseDown={onmousedown}
                            onDragStop={(e) => onDragStop(e)}
                            onMouseUp={onMouseUp}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onDragStart={ondragstart}
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

