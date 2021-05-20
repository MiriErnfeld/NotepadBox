import React, { useState } from 'react'
import $ from 'jquery'
import './configurator.css'

import { actions } from '../components/redux/actions/action';
import folserPlus from '../images/folder-plus.png'
import { useDispatch, useSelector } from 'react-redux'
import { FiFolderPlus, FiFolder, FiMoreVertical } from "react-icons/fi";
import { FcPlus } from "react-icons/fc";
import Dropdown from 'react-bootstrap/Dropdown'
import { BsFillPlusCircleFill } from "react-icons/bs";

// import 'bootstrap/dist/css/bootstrap.min.css';

import MyNote from './myNote'
var Color = require('color');

export default function Configurator() {
    const [arr, setarr] = useState([])
    const [countCol, setCountCol] = useState(0)
    const [arrnums, setarrnums] = useState([{}])
    const [count, setCount] = useState(0)
    const [topNote, setTopNote] = useState("")
    const [rightNote, setRightNote] = useState("")
    const dispatch = useDispatch()
    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }
    function addCol() {
        if (countCol==5) {
            alert("5555555555555")
            $('.p-cloumn').css("display", "none")
            
        }
        let cnt = countCol + 1

        if (countCol < 5) {
            setCountCol(cnt)
        }
      
    }
    function changeStyle(index) {
        alert(index + "current index:::::::")
        console.log("indexxxxxxxx::::::::" + index);
        debugger
        $('.inputTitle' + index).css("backgroundColor", "#F1F1F3");
        $('.inputTitle' + index).css("font-weight", "bold");
        $('.inputTitle' + index).css("text-align", "center");
        if (index == 5) {
            alert("55555555")
            $('.p-cloumn').css("display", "none")
        }
    }

    function insertNote() {

        let cnt = count + 1
        setCount(cnt)

        setarr([...arr, { text: "", check: false, flagColor: false, colors: "#FFEB3B", id: count, top: topNote, right: rightNote }])
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])

        console.log(arr);
        if (arr.text)
            dispatch(actions.createNote(arr.text))

    }

    return (
        <div className="container-notes">
            <div className="configurator-line row">
                <p className="my-notes ">My Notes</p>
                {countCol > 0 ? <input type="text" className="inputTitle1" onFocus={"border", "none"} onChange={e => changeStyle(1)} /> : ""}
                {countCol > 1 ? <input type="text" className="inputTitle2" onChange={e => changeStyle(2)} /> : ""}
                {countCol > 2 ? <input type="text" className="inputTitle2" onChange={e => changeStyle(2)} /> : ""}
                {countCol > 3 ? <input type="text" className="inputTitle2" onChange={e => changeStyle(2)} /> : " "}
                {countCol > 4 ? <input type="text" className="inputTitle2" onChange={e => changeStyle(5)} /> : " "}
                <p className="p-cloumn" onClick={addCol}>
                    new coloumn
                    <BsFillPlusCircleFill className="plus-icon" ></BsFillPlusCircleFill>
                </p>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-2" style={{ borderRight: "4px solid #dee2e6", height: "550px" }}>
                    </div>
                    {countCol > 0 ? <div class="col-sm-2   " style={{ borderRight: "4px solid #dee2e6", height: "550px" }}>
                    </div> : " "}
                    {countCol > 1 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", height: "550px" }}>
                    </div> : ""}
                    {countCol > 2 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", height: "550px" }}>
                    </div> : ""}
                    {countCol > 3 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", height: "550px" }}>
                    </div> : ""}
                </div>
            </div>
            <div className="container-configurator">
                <div className="create-note" onClick={insertNote}>Create Note +</div>
                {/* -----------------TO NEXT VERSION----------- */}
                {/* <div className="dragfolder"> */}
                {/* <img src="folserPlus" at="img"></img> */}
                {/* <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus>
                    <p className="folder">drag notes to create folder</p>
                </div> */}
                <div className="folder">
                    {/* <FiFolder></FiFolder>
                    folder name */}
                </div>
            </div>
            <MyNote
                arr={arr}
                setarr={setarr}
                arrnums={arrnums}
                setarrnums={setarrnums}
                count={count}
                setCount={setCount}
                topNote={topNote}
                setTopNote={setTopNote}
                rightNote={rightNote}
                setRightNote={setRightNote}
            ></MyNote>
        </div >
    )

}