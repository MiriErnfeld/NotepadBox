import React, { useState, useEffect, useRef } from 'react'
import { actions } from './redux/actions/action'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDotsת, BsCheck } from "react-icons/bs";
import { FaGripHorizontal } from "react-icons/fa";
import { LightenDarkenColor } from 'lighten-darken-color';
import './myNote.css'
import $ from 'jquery'

export default function Notes(props) {
    const [check, setCheck] = useState("")
    const [currentItem, setCurrentItem] = useState("")
    const { arr, setarr, arrnums, count, setCount, setarrnums, topNote, setTopNote
        , rightNote, setRightNote } = props

    const dispatch = useDispatch()
    const nums = [300, 7, 0, 9, 7, 4, 2, 14, 6, 23, 18, 29, 10, 2,]

    useEffect(() => {
        debugger
        $('.note').draggable();
    }, [])

    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#7bdcb5', '#44D7B6'
        , '#40D9ED', '#ff8a65', '#d9e3f0'
    ];
    function openCloseEditor(item) {
        debugger
        let i = item.id
        let newArr = [...arr]
        newArr[i].flagColor = !item.flagColor
        setarr([...newArr])
    }
    function changeColor(c, item, index) {
        debugger
        setCheck(index)
        setCurrentItem(item)
        let i = item.id
        let newArr = [...arr]
        newArr[i].colors = c
        setarr(newArr)
        let currentclass = `note ${i}`
        let currentclassText = `textarea ${i}`
        let note = document.getElementsByClassName(currentclass)[0]
        let text = document.getElementsByClassName(currentclassText)[0]
        note.style.backgroundColor = item.colors;
        text.style.backgroundColor = item.colors;
    }

    useEffect(() => {
        console.log('on use', arr); debugger;
        $('.note').draggable();

    }, [arr])

    function removeItem(item) {
        debugger
        const a = [...arr];
        const r = item.id - 1
        console.log(r);
        a.splice(r, 1)
        setarr([...a])
    }
    // function changeNotePlace(e, index) {
    //     debugger
    //     console.log("item.id::::" + index + "top::::::" + e.target.style.top, "right::::" + e.target.style.right);
    // }

    function saveText(item, newText) {
        debugger
        if (newText !== " ") {
            const i = item.id
            let list = [...arr];
            console.log(list[i].text);
            (list[i].text) = newText;
            console.log(list);
            setarr([...list]);
            dispatch(actions.createNote(arr[i].text))
        }

    }
    return (
        <>
            <div className="container">
                <div className="all-notes">
                    {arr.map((item, index) =>
                        <>
                            <div key={index} className={`note ${item.id}`}
                                style={{
                                    top: `${index * 30 + 50}px`,
                                    right: `${props.arrnums[index].x + 300}px`
                                }}>
                                {setTopNote(`${index * 30 + 50}px`)}
                                {setRightNote(`${props.arrnums[index].x + 300}px`)}
                                <div className={`header ${item.id}`}
                                    style={{ backgroundColor: LightenDarkenColor(item.colors, -45) }}>
                                    <BsPencil className="openCloseEditor" onClick={e => openCloseEditor(item)} style={{
                                        marginLeft: "121px",
                                        marginTop: " 8px",
                                        paddingBottom: "3px",
                                        cursor: "auto",
                                    }}></BsPencil>
                                    <FaGripHorizontal style={{ marginTop: "-16px", fontWeight: "none" }}></FaGripHorizontal>
                                    <BsX style={{
                                        hoverBackground: "black",
                                        marginRight: "123px",
                                        paddingBottom: "3px",
                                        cursor: "auto",
                                        marginTop: "-15px"
                                    }} onClick={e => removeItem(item)}></BsX>
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
                                                return <div className="divColors " className="colorDiv handPointer"
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
            </div>
        </>
    )
}