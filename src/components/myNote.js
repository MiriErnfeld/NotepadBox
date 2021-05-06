import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from './redux/actions/action'
import './myNote.css'
import Color from './colorPallete'
import './colorPallete.css'
import $ from 'jquery'

export default function Notes() {

    useEffect(() => {
        $('.note33333').draggable();
    }, [])

    const [isClicked, setisClicked] = useState(false)
    const [btn, setbtn] = useState(false)
    const [arr, setarr] = useState([])
    const [countNote, setcountNote] = useState(0)
    const dispatch = useDispatch()

    const randomBetween=(min, max)=>
    {
        return (min + Math.ceil(Math.random() * max));
    }


    function insertNote() {
        debugger

        let count = (countNote + 1)
        setcountNote(countNote + 1)
        setbtn(!btn)
        console.log(countNote);
        setarr([...arr, { text: "", }])
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

                    {arr.map(item => <div className="note33333 col-3">
                        <button onClick={changeColor}>//</button> </div>)}
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