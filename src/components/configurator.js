import React, { useState } from 'react'
import './configurator.css'
import { actions } from '../components/redux/actions/action';
import folserPlus from '../images/folder-plus.png'
import { useDispatch, useSelector } from 'react-redux'
import { FiFolderPlus, FiFolder } from "react-icons/fi";
import Dropdown from 'react-bootstrap/Dropdown'
// import 'bootstrap/dist/css/bootstrap.min.css';

import MyNote from './myNote'
var Color = require('color');


export default function Configurator() {
    const [arr, setarr] = useState([])
    const [arrnums, setarrnums] = useState([{}])
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const randomBetween = (min = 1, max = 900) => {
        return (min + Math.ceil(Math.random() * max));
    }
    function insertNote() {
        debugger
        let cnt = count + 1
        setCount(cnt)
        debugger
        setarr([...arr, { text: "", flagColor: false, colors: "#FFEB3B", id: count }])
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])
        debugger
        console.log(arr);
        if (arr.text)
            dispatch(actions.createNote(arr.text))
        debugger
    }

    return (
        <div className="container-notes">

            <div className="configurator-line">
                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
  </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <p className="my-notes">My Notes</p>
            </div>
            <div className="container-configurator">
                <div className="create-note" onClick={insertNote}>Create Note +</div>
                <div className="dragfolder">
                    {/* <img src="folserPlus" at="img"></img> */}
                    <FiFolderPlus className="folderplus" style={{ zoom: 1.8, color: "#7B7D70", marginTop: "3px" }}></FiFolderPlus>
                    <p className="folder">drag notes to create folder</p>
                </div>
                <div className="folder">
                    <FiFolder></FiFolder>
                    folder name
                </div>

            </div>
            <MyNote
                arr={arr}
                setarr={setarr}
                arrnums={arrnums}
                setarrnums={setarrnums}
                count={count}
                setCount={setCount}

            ></MyNote>
        </div>
    )

}