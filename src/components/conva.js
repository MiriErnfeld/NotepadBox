import React, { useState } from "react";
import './styles.css'
import $ from 'jquery'
import { Stage, Layer, Rect, Group, Text } from 'react-konva';
import textObj from 

export default function Conva() {

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Group x={20} y={20} draggable>
                    <Rect

                        width={100}
                        height={100}
                        fill="red"
                        shadowBlur={10}

                    />
                    <Text

                        text="write here..."
                    />
                    
                              
<TextObj
                             
                          

                              />


                </Group>
            </Layer>
        </Stage>


    )
}
