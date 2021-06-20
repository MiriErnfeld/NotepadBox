import React, { useState, useEffect } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'


export default function Try() {


    const [resize, setresize] = useState({
        width: 100,
        height: 100,
        top: 100,
        left: 100,
        rotateAngle: 0
    })


    function handleResize(style, isShiftKey, type) {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        setresize({
            top,
            left,
            width,
            height
        })
    }

    function handleRotate(rotateAngle) {
        setresize({
            rotateAngle
        })
    }

    function handleDrag(deltaX, deltaY) {
        debugger

        setresize({
            left: resize.left + deltaX,
            top: resize.top + deltaY
        })
    }

    

    return (

        <div >
            <ResizableRect
                left={resize.left}
                top={resize.top}
                width={resize.width}
                height={resize.height}
                rotateAngle={resize.rotateAngle}
                // aspectRatio={false}
                // minWidth={10}
                // minHeight={10}
                zoomable='n, w, s, e, nw, ne, se, sw'
                // rotatable={true}
                // onRotateStart={this.handleRotateStart}
                onRotate={handleRotate}
                // onRotateEnd={this.handleRotateEnd}
                // onResizeStart={this.handleResizeStart}
                onResize={handleResize}
                // onResizeEnd={this.handleUp}
                // onDragStart={this.handleDragStart}
                onDrag={handleDrag}
            // onDragEnd={this.handleDragEnd}
            />
        </div>

    )


}


