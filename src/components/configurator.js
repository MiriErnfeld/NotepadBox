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

   const dispatch = useDispatch()
       {/* //not use::::::: */}
    // const [countCol, setCountCol] = useState(0)
    const [arrnums, setarrnums] = useState([{}])
 
    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }
       {/* //not use::::::: */}
    // function addCol() {
    //     debugger
    //     if (countCol == 4) {

    //         $('.p-cloumn').css("display", "none")
    //     }
    //     let cnt = countCol + 1

    //     if (countCol < 5) {
    //         setCountCol(cnt)
    //     }

    // }
       {/* //not use::::::: */}
    // function changeStyle(index) {
    //     debugger
    //     $('.inputTitle' + index).css("backgroundColor", "#F1F1F3");
    //     $('.inputTitle' + index).css("font-weight", "bold");
    //     $('.inputTitle' + index).css("text-align", "center");
    // }
    function insertNote() {
        debugger
        dispatch(actions.setNoteList());
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])
    }
    return (
        <>
            <div className="container-notes">
                <div className="configurator-line row justify-content-start d-flex ">
                    <p className="my-notes col-2">My Notes:</p>

                    {/* //not use::::::: */}

                    {/* {countCol > 0 ? <div class="col-2"> <input type="text" className="inputTitle1" onChange={e => changeStyle(1)} /> </div> : ""}

                    {countCol > 1 ? <div className="col-2">
                        <input type="text" className="inputTitle2" onChange={e => changeStyle(2)} />    </div> : ""}

                    {countCol > 2 ? <div className="col-2">
                        <input type="text" className="inputTitle3" onChange={e => changeStyle(3)} />   </div> : ""}

                    {countCol > 3 ? <div className="col-2">
                        <input type="text" className="inputTitle4" onChange={e => changeStyle(4)} />    </div> : " "}

                    {countCol > 4 ? <div className="col-2">
                        <input type="text" className="inputTitle5" onChange={e => changeStyle(5)} /> </div> : " "} */}
                    {/* <p className="p-cloumn col-2" onClick={addCol}>
                        new coloumn
                    <BsFillPlusCircleFill className="plus-icon" ></BsFillPlusCircleFill>
                    </p> */}
                </div>
                <div class="container">

                       {/* //not use::::::: */}

                    {/* <div class="row">
                        <div class="col-sm-2" style={{ borderRight: "4px solid #dee2e6", height: "80%" }}>
                        </div>
                        {countCol > 0 ? <div class="col-sm-2   " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : " "}
                        {countCol > 1 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : ""}
                        {countCol > 2 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : ""}
                        {countCol > 3 ? <div class="col-sm-2 " style={{ borderRight: "4px solid #dee2e6", minHeight: "100%" }}>
                        </div> : ""}
                    </div> */}
                    <div class="row">
                        <MyNote
                            arrnums={arrnums}
                            setarrnums={setarrnums}
                        ></MyNote>
                    </div>
                </div>

            </div >
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
        </>
    )
}