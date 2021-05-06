import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from './redux/actions/action'
import './myNote.css'
import Color from './colorPallete'
import './colorPallete.css'
import $ from 'jquery'

export default function Notes() {

    useEffect(() => {
        debugger


        // const randomBetween = (min, max) => {
        //     return (min + Math.ceil(Math.random() * max));
        // }
        // setstyleNote({
        //     right: randomBetween(0, window.innerWidth - 150) + 'px',
        //     top: randomBetween(0, window.innerHeight - 150) + 'px',
        //     transform: 'rotate( ' + randomBetween(-15, 15) + 'deg)'
        // });
        // console.log("dtyle---" + styleNote)
        // // $('.note33333').draggable();
    }, [])

    const [isClicked, setisClicked] = useState(false)
    const [btn, setbtn] = useState(false)
    const [arr, setarr] = useState([])
    const [countNote, setcountNote] = useState(0)
    const [styleNote, setstyleNote] = useState()
    const dispatch = useDispatch()

    // const myStyles = {
    //     position: 'absolute',
    //     left=Math.round(),
    //     bottom: Math.floor(Math.random() * 50),
    //     // left: '50%',
    //     // transform: 'translate(-50%, -50%)'



    // };



    function insertNote() {
        debugger

        let count = (countNote + 1)
        setcountNote(countNote + 1)
        setbtn(!btn)
        console.log(countNote);
        setarr([...arr, { text: "", color: "" }])

        // dispatch(actions.addNote({}))
        debugger

    }
    const mycolors = [
        '#44D7B6', '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#FD80E5', '#6DD41F', '#BFD41F', '#F0D923', '#F8B520'
        , '#F88C20', '#F84A20', '#F13B7F'
    ];
    function changeColor() {
        setisClicked(!isClicked)

    }
    return (
        <>
            <button onClick={insertNote} >add note</button>
            {/* {btn ?
      
       <Notes></Notes> : " "} */}
            <div className="container">
                <div className="row">

                    {arr.map(item => <div className="note33333 col-3"
                        style={{
                            left: Math.random(),
                            top: Math.random() 
                        }} >
                        <button onClick={changeColor}>//</button></div>
                    )}
                    <div className="col-2">
                        {isClicked ?
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
            </div>

        </>

    )
}


