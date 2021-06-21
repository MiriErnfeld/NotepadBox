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
    {/* //not use::::::: */ }
    // const [countCol, setCountCol] = useState(0)
    const [arrnums, setarrnums] = useState([{}])
    const [CcurrentItem, setCcurrentItem] = useState()



    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }
    {/* //not use::::::: */ }
    // function addCol() {
    //      
    //     if (countCol == 4) {

    //         $('.p-cloumn').css("display", "none")
    //     }
    //     let cnt = countCol + 1

    //     if (countCol < 5) {
    //         setCountCol(cnt)
    //     }

    // }
    {/* //not use::::::: */ }
    // function changeStyle(index) {
    //      
    //     $('.inputTitle' + index).css("backgroundColor", "#F1F1F3");
    //     $('.inputTitle' + index).css("font-weight", "bold");
    //     $('.inputTitle' + index).css("text-align", "center");
    // }
    function insertNote() {

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
                        <MyNote />
                    </div>
                </div>

            </div >
            {/* <div className="container container-configurator"> */}
            <div className="container container-configurator">
                <div className="row create-note" onClick={insertNote}>Create Note +</div>
                <div className="row dragfolder">
                    {/* <div className="row "> */}
                    <img src={folserPlus} alt="img" style={{ zoom: 0.8, color: "#7B7D70", marginTop: "3px" }}></img>
                    {/* <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus> */}
                    <p className="folder" style={{ fontSize: '15' }}>drag notes to create folder</p>
                </div>
                {/* <div className="row ">
                    <FiFolder></FiFolder>
                    folder name
                </div> */}
            </div>
        </>
    )
}