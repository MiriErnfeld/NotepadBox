import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDots, BsCheck } from "react-icons/bs";
import Configurator from './configurator'
import './myNote.css'
import $ from 'jquery'

export default function Notes() {

    let [arr, setarr] = useState([])
    const [arrnums, setarrnums] = useState([{}])
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const nums = [3, 7, 0, 9, 7, 4, 2, 14, 6, 23, 18, 29, 10, 2,]

    useEffect(() => {
        debugger
        $('.note').draggable();
    }, [])

    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }

    function insertNote() {
        let cnt = count + 1
        setCount(cnt)
        debugger
        setarr([...arr, { text: "", flagColor: false, colors: "", id: count }])
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])
        debugger
        console.log(arr);
    }
    const mycolors = [
        '#F84A20', '#F13B7F', '#F88C20', '#FD808B', '#F8DB3D', '#B620E0',
        '#BFD41F', '#8580FD', '#6DD41F', '#3598F4', '#44D7B6'
        , '#40D9ED', '#F84A20', '#F13B7F'
    ];
    function openCloseEditor(item) {
        debugger
        let i = item.id
        let newArr = [...arr]
        newArr[i].flagColor = !item.flagColor
        setarr([...newArr])
    }
    function changeColor(c, item) {
        debugger

        let i = item.id
        let newArr = [...arr]
        newArr[i].colors = c
        setarr(newArr)
        let currentclass = `note ${i}`
        let currentclassText = `textarea ${i}`
        let headerColor = `header ${item.id}`
        let note = document.getElementsByClassName(currentclass)[0]
        let text = document.getElementsByClassName(currentclassText)[0]
        let header = document.getElementsByClassName(headerColor)[0]
        note.style.backgroundColor = item.colors
        text.style.backgroundColor = item.colors
        header.style.backgroundColor = item.colors
    }

    useEffect(() => {
        console.log('on use', arr); debugger;
        $('.note').draggable();
    }, [arr])

    function removeItem(item) {
        debugger
        const a = [...arr];
        a.splice(item.id, 1)
        setarr([...a])
        // setarr(arr.filter((x, y) => item.id !== x.id))
    }


    function saveText(item, newText) {
        debugger
        if (newText !== " ") {
            const i = item.id
            let list = [...arr];
            list[i].text = newText;
            console.log(list);
            setarr([...list]);
        }

    }
    return (
        <>
            <Configurator></Configurator>
            <div className="create-note" onClick={insertNote}>Create Note +</div>
            <div className="container">
                <div className="">
                    {arr.map((item, index) =>
                        <>
                            <div key={index} className={`note ${item.id}`} style={{
                                top: `${index * 30 + 50}px`,
                                left: `${arrnums[index].x}px`
                            }}>

                                <div className={`header ${item.id}`}>
                                    <BsPencil className="openCloseEditor" onClick={e => openCloseEditor(item)} style={{
                                        marginLeft: "121px",
                                        marginTop: " 8px",
                                        cursor: "auto",
                                    }}></BsPencil>
                                    <BsThreeDots style={{ marginTop: "-16px" }}></BsThreeDots>
                                    <BsX style={{
                                        marginRight: "123px",
                                        cursor: "auto",
                                        marginTop: "-15px"
                                    }} onClick={e => removeItem(item)}></BsX>
                                    <textarea
                                        className={`textarea ${item.id}`}
                                        id="areaText"
                                        // ref={refText}
                                        type="string"
                                        onBlur={e => saveText(item, e.target.value)}
                                    ></textarea>
                                    {/* <button onClick={e => saveText(index, refText.current.value)}>save</button> */}
                                </div>
                                <div className="curr-container">
                                    {item.flagColor ?
                                        <div className="curr" >
                                            {mycolors.map((c, i) => {
                                                return <div className="divColors " className="colorDiv handPointer"
                                                    style={{ backgroundColor: c }} onClick={e => changeColor(c, item)}>
                                                </div>

                                            })}
                                            {/* {
                                                item[index].colors===item.c ?
                                                    <BsCheck></BsCheck> : ""
                                            } */}
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



// {
//     colors.map((c, i) => {
//         return <div className="divColors" className="colorDiv handPointer"

//             style={{ backgroundColor: c }}
//         >
//             {props.editFolder ? props.editFolder.color === c ?
//                 <img src={iconv} id="imgI" /> : " " : " "}
//         </div>
//     })
// }
