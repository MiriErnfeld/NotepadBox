import React, { useState, useEffect, useRef } from 'react'
import { actions } from './redux/actions/action'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDotsת, BsCheck } from "react-icons/bs";
import { FaGripHorizontal } from "react-icons/fa";
import { LightenDarkenColor } from 'lighten-darken-color';
import './myNote.css'
import $ from 'jquery'

export default function Notes(props) {


    const noteList = useSelector(state => state.reducerNote.noteList)
    const data = useSelector(state => state.reducerNote)

    const [check, setCheck] = useState("")
    const [currentItem, setCurrentItem] = useState("")
    const [currentFlag, setCurrentFlag] = useState(0)
    const {

        arrnums,
    } = props

    const dispatch = useDispatch()
    const nums = [300, 7, 0, 9, 7, 4, 2, 14, 6, 23, 18, 29, 10, 2,]


    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];
    function openCloseEditor(item) {

        let i = item.id
        let newArr = [...noteList]
        for (let index = 0; index < noteList.length; index++) { ///find the preview open editor
            if (noteList[index].flagColor == true && index !== i)
                noteList[index].flagColor = false
        }
        newArr[i].flagColor = !item.flagColor
        noteList = [...newArr]
    }
    function changeColor(c, item, index) {
        setCheck(index)
        setCurrentItem(item)
        let i = item.id
        let newArr = [...noteList]
        newArr[i].colors = c
        noteList = [...newArr]
        let currentclass = `note ${i}`
        let currentclassText = `textarea ${i}`
        let note = document.getElementsByClassName(currentclass)[0]
        let text = document.getElementsByClassName(currentclassText)[0]
        note.style.backgroundColor = item.colors;
        text.style.backgroundColor = item.colors;
    }

    function removeItem(item) {
        const a = [...noteList];

        const index = a.indexOf(a.find(x => x.id == item.id))
        if (index !== -1)
            a.splice(index - 1, 1)
        noteList = [...a]

        // const a = [...arr];
        // const r = item.id - 1
        // console.log(r);
        // a.splice(r, 1)
        // setarr([...a])
    }
    // function changeNotePlace(e, index) {
    //       
    //     console.log("item.id::::" + index + "top::::::" + e.target.style.top, "right::::" + e.target.style.right);
    // }

    function saveText(item, newText) {
        debugger
        if (newText !== " ") {
            const i = item.id
            let list = [...noteList];
            console.log(list[i].text);
            (list[i].text) = newText;
            console.log(list);
            noteList = [...list];
            dispatch(actions.createNote(noteList[i].text))
        }

    }
    return (
        <>
            {/* <div className="container"> */}
            <div className="all-notes">
                {noteList.map((item, index) =>
                    <>
                        <div key={index} className={`note ${item.id}`}
                            style={{
                                top: "10%",
                                left: "20%"
                            }}>
                            {/* {data.topNote = "10%"}
                            {data.rightNote = "20%"} */}
                            <div className={`header ${item.id}`}
                            // style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }}
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
                                <FaGripHorizontal style={{ marginTop: "-16px", fontWeight: "none", color: "#0A102E" }}></FaGripHorizontal>
                                <BsX style={{
                                    color: "#0A102E",
                                    hoverBackground: "black",
                                    marginRight: "123px",
                                    paddingBottom: "3px",
                                    cursor: "auto",
                                    marginTop: "-15px"
                                }} onClick={() => removeItem(item)}></BsX>
                                <textarea
                                    className={`textarea ${item.id}`}
                                    id="areaText"
                                    type="string"
                                    onBlur={e => saveText(item, e.target.value)}
                                ></textarea>
                            </div>
                            <div className="curr-container">
                                {item.flagColor ?
                                    <div className="curr" >
                                        {mycolors.map((c, i) => {
                                            return <div key={i} className="divColors " className="colorDiv handPointer"
                                                style={{ backgroundColor: c }} onClick={e => changeColor(c, item, i)}
                                            > {check == i && currentItem == item ?
                                                <BsCheck
                                                    style={{
                                                        fontSize: "13px",
                                                        marginTop: " 2px",
                                                        color: "white",
                                                        fontWeight: "bold"
                                                    }}></BsCheck> : " "}
                                            </div>

                                        })}
                                    </div>
                                    : ""}
                            </div>
                        </div>
                    </>)
                }
            </div>
            {/* </div> */}
        </>
    )
}