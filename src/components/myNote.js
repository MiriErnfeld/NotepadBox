import React, { useState } from 'react'
import './myNote.css'
import Color from './colorPallete'
import './colorPallete.css'

export default function Notes() {
    const [isClicked, setisClicked] = useState(false)
    const mycolors = [
        '#44D7B6', '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#FD80E5', '#6DD41F', '#BFD41F', '#F0D923', '#F8B520'
        , '#F88C20', '#F84A20', '#F13B7F'
    ];
    function changeColor() {
        setisClicked(!isClicked)

    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="note33333 col-3">
                        <button onClick={changeColor}>//</button> </div>
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