import React from 'react'
import './myNote.css'
import Color from './colorPallete'

export default function Notes() {

    function changeCOlor() {

        
        <div className="curr" >
        {mycolors.map((c, i) => {
            return <div className="divColors " className="colorDiv handPointer"
                // style={{ backgroundColor: c }}
                style={{ backgroundColor: c }}
            >
            </div>
        })}
     

    }

    return (
        <div className="note">
            <button onClick={changeCOlor}>//</button>

        </div>
    )



}