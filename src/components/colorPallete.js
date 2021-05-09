
import React, { useState } from "react";
import './myNote.css'
import $ from 'jquery'
import { Stage, Layer, Rect, Group, Text } from 'react-konva';
import Portal from './portal'
// import FontAwesomeIcon from './font-awesome'

export default function Colors() {

    const mycolors = [
        '#44D7B6', '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#FD80E5', '#6DD41F', '#BFD41F', '#F0D923', '#F8B520'
        , '#F88C20', '#F84A20', '#F13B7F', '#FD808B',
        '#F88C21'
    ];

    return (
        <div className="curr" >
            {mycolors.map((c, i) => {
                return <div className="divColors " className="colorDiv handPointer"
                    // style={{ backgroundColor: c }}
                    style={{ backgroundColor: c }}
                >
                </div>
            })}
        </div>

    )
}






