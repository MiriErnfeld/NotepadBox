import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsPencil, BsX, BsThreeDots } from "react-icons/bs";
import { actions } from './redux/actions/action'
import './myNote.css'
import Color from './colorPallete'
import $ from 'jquery'

export default function Notes() {

    useEffect(() => {
        debugger
        // setstyleNote({
        //     right: randomBetween(0, window.innerWidth - 150) + 'px',
        //     top: randomBetween(0, window.innerHeight - 150) + 'px',
        //     transform: 'rotate( ' + randomBetween(-15, 15) + 'deg)'
        // });
        // console.log("dtyle---" + styleNote)
        $('.note').draggable();
    }, [])

    const [isClicked, setisClicked] = useState(false)
    const [indexNote, setindexNote] = useState("")
    const [currentIndex, setcurrentIndex] = useState("")
    const [btn, setbtn] = useState(false)
    const [arr, setarr] = useState([])
    const [countNote, setcountNote] = useState(0)
    const [styleNote, setstyleNote] = useState()
    const [arrnums, setarrnums] = useState([{}])
    const dispatch = useDispatch()
    const nums = [3, 7, 0, 9, 7, 4, 2, 14, 6, 23, 18, 29, 10, 2,]

    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }

    function insertNote(index) {
        debugger

        let count = (countNote + 1)
        setcountNote(countNote + 1)
        setbtn(!btn)
        console.log(countNote);
        setarr([...arr, { text: "", color: "", count: countNote, flagColor: false }])
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])
        // dispatch(actions.addNote({}))
        debugger

    }
    const mycolors = [
        '#44D7B6', '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#FD80E5', '#6DD41F', '#BFD41F', '#F0D923', '#F8B520'
        , '#F88C20', '#F84A20', '#F13B7F'
    ];
    function changeColor(index, item) {
        debugger
        // setarr([...arr, { text: "", color: "", count: countNote,flagColor:false }])
        arr[index].flagColor = true

        console.log("arr[index].flagcoloer" + arr[index].flagColor);
        console.log("isClicked" + isClicked);
        // setcurrentIndex(arr[index].count)
        setindexNote(index)
        setisClicked(true)
    }
    function close(index) {
        debugger
        let list = [...arr]
        var elm = list[index];
        list.splice(index, 1);
        setarr([...list])
    }
    return (
        <>
            <button onClick={insertNote} >add note</button>
            {/* {btn ?
       <Notes></Notes> : " "} */}
            <div className="container">
                <div className="">
                    {arr.map((item, index) =>
                        <>
                            <div key={index} className="note note-container" style={{
                                top: `${index * 30}px`,
                                left: `${arrnums[index].x}px`
                            }}>

                                <div className="header">
                                    <BsPencil onClick={e => changeColor(index, item)} style={{
                                        marginLeft: "121px",
                                        marginTop: " 8px"
                                    }}></BsPencil>
                                    <BsThreeDots style={{ marginTop: "-16px" }}></BsThreeDots>
                                    <BsX style={{
                                        marginRight: "123px",
                                        marginTop: "-15px"
                                    }} onClick={e => close(index)}></BsX>
                                </div>
                                <div className="curr-container">

                                    {(isClicked) && ((arr[indexNote].flagColor) == "true") ?
                                        <div className="curr" >
                                            {mycolors.map((c, i) => {
                                                return <div className="divColors " className="colorDiv handPointer"
                                                    // style={{ backgroundColor: c }}
                                                    style={{ backgroundColor: c }}
                                                >
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


