import React, { useState } from 'react'
import './configurator.css'
import { actions } from '../components/redux/actions/action';
import { useDispatch, useSelector } from 'react-redux'
import { FiFolderPlus, FiFolder } from "react-icons/fi";
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
        var firstColor = Color('rgb(255, 255, 0)')
        let cnt = count + 1
        setCount(cnt)
        debugger
        setarr([...arr, { text: "", flagColor: false, colors: "#efea0c;", id: count }])
        setarrnums([...arrnums, { x: randomBetween(), y: randomBetween() }])
        debugger
        console.log(arr);
        if (arr.text)
            dispatch(actions.createNote(arr.text))
        debugger
    }

    return (
        <div className="container-configurator">
            <div className="create-note" onClick={insertNote}>Create Note +</div>
            <div className="dragfolser">
                <FiFolderPlus className="folderplus" style={{ zoom: 2 }}></FiFolderPlus>
                <p className="folder">drag notes to create folder</p>
            </div>
            <div className="folder">
                <FiFolder></FiFolder>
                    folder name
                </div>
            <div className="folder"><FiFolder></FiFolder></div>
            <MyNote
                arr={arr}
                arrnums={arrnums}
                count={count}
                setarr={setarr}
                setCount={setCount}
                setarrnums={setarrnums}
            ></MyNote>
        </div>
    )

}