import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDots } from "react-icons/bs";
import { actions } from './redux/actions/action'
import './myNote.css'
import Color from './colorPallete'
import $ from 'jquery'

export default function Notes() {

    let [arr, setarr] = useState([])
    const [arrnums, setarrnums] = useState([{}])
    const dispatch = useDispatch()
    const nums = [3, 7, 0, 9, 7, 4, 2, 14, 6, 23, 18, 29, 10, 2,]

    useEffect(() => {
        debugger
        $('.note').draggable();
    }, [])

    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }

    function insertNote(index) {
        debugger
        setarr([...arr, { text: "", color: "", flagColor: false }])
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])
        debugger
    }
    const mycolors = [
        '#44D7B6', '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#FD80E5', '#6DD41F', '#BFD41F', '#F0D923', '#F8B520'
        , '#F88C20', '#F84A20', '#F13B7F'
    ];
    function openCloseEditor(index, item) {
        debugger
        let newArr = [...arr]
        newArr[index].flagColor = !item.flagColor
        setarr(newArr)
    }
    function changeColor(item, index) {
        debugger
        let color = item
        let currentclass = `note ${index}`
        let note = document.getElementsByClassName(currentclass)[0]
        note.style.backgroundColor = color
    }

    useEffect(() => {
        console.log('on use'); debugger;
        $('.note').draggable();
    }, [arr])

    function removeItem(index, item) {
        debugger
        // let remove = `note ${index}`
        // let note = document.getElementsByClassName(remove)[0]
        // note.style.remove()
        console.log(arr);
        let list = [...arr]
        list.splice(index, 1);
        console.log(list);
        setarr([...list])
    }
    return (
        <>
            <button onClick={insertNote} >add note</button>
            <div className="container">
                <div className="">
                    {arr.map((item, index) =>
                        <>
                            <div key={index} className={`note ${index}`} style={{
                                top: `${index * 30}px`,
                                left: `${arrnums[index].x}px`
                            }}>
                                <div className="header">
                                    <BsPencil onClick={e => openCloseEditor(index, item)} style={{
                                        marginLeft: "121px",
                                        marginTop: " 8px"
                                    }}></BsPencil>
                                    <BsThreeDots style={{ marginTop: "-16px" }}></BsThreeDots>
                                    <BsX style={{
                                        marginRight: "123px",
                                        marginTop: "-15px"
                                    }} onClick={e => removeItem(index, item)}></BsX>
                                </div>
                                <div className="curr-container">
                                    {item.flagColor ?
                                        <div className="curr" >
                                            {mycolors.map((color, i) => {
                                                return <div className="divColors " className="colorDiv handPointer"
                                                    style={{ backgroundColor: color }} onClick={e => changeColor(color, index)}>
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


