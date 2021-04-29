import React, { useState, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Portal from './portal.js'

const TextObj = ({  }) => {
    const TextRef = React.useRef();
    const trRefText = React.useRef();
    const textareaRef = React.useRef();
    const [isShowTextarea, setIsShowTextarea] = React.useState(false);
    const [isShowKonvaText, setIsShowKonvaText] = React.useState(true)
    const [height1, setheight1] = React.useState(20)
    const [width1, setwidth1] = React.useState(200)
    const [uiu, setuiu] = React.useState(true)
    const [widthTrText, setWidthTrText] = React.useState(title.width);
    let boundBoxFunc



    React.useEffect(() => {
        if (isShowTextarea) {
            setheight1(document.getElementById("textarea").style.height)
            setwidth1(document.getElementById("textarea").style.width)
        }
    }, [isShowTextarea]);

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRefText.current.nodes([TextRef.current]);
            trRefText.current.getLayer().batchDraw();

        }
        if (!isSelected) {
            // we need to attach transformer manually
            setuiu(true);
            setIsShowTextarea(false);
            setIsShowKonvaText(true);
        }

    }, [isSelected]);


    const clickOnKonvaText = (e) => {
        setuiu(false);
        setIsShowTextarea(true);
        setIsShowKonvaText(false)
        // props.dispatch(stage_listening(false));

        // console.log(document.getElementById('textarea'))


    }
    // const removeTextarea = () => {

    //   
    //   // props.dispatch(stage_listening(true));
    //   setuiu(true);
    //   setIsShowTextarea(false);
    //   setIsShowKonvaText(true);


    //   //איך אני מעדכנת את הגובה של הטקסט מהדוקיומנט?


    // }
    const onChangeTitleInput = (e) => {
        props.dispatch(title_text((e.target.value), title.id))
        // console.log(document.getElementById("textarea").scrollHeight)
        // document.getElementById("textarea").style.height = document.getElementById("textarea").scrollHeight + 'px';
        // TextRef.current.width(document.getElementById("textarea").scrollHeight)
        setheight1(document.getElementById("textarea").style.height)
        setwidth1(document.getElementById("textarea").style.width)
    }

    return (
        <React.Fragment>
            {isShowKonvaText && (
                <Text
                   
                   
                    draggable
                    strokeScaleEnabled={true}
                    fillAfterStrokeEnabled={true}
                    strokeHitEnabled
                    onClick={onSelect}
                    onTap={onSelect}
                    onContextMenu={handleContextMenu}
                    onMouseOut={onMouseUp}
                    onMouseDown={onMouseDown}
                    draggable
                    onDragMove={() => {
                        if (props.grid.ongrid === true)
                            props.dispatch(grid_elem(title.x, title.y, TextRef))

                    }
                    }
                    onDblClick={clickOnKonvaText}
                    onDragEnd={(e) => {
                        props.dispatch(offgrid())
                        onChange({
                            ...title,
                            x: e.target.x(),
                            y: e.target.y(),
                            rotation: e.target.rotation(),
                        });
                    }}
                    // onTransform={(e) => {
                    //      const textNode = TextRef.current;
                    //     textNode.setAttrs({
                    //         // width: textNode.width() * textNode.scaleX(),
                    //         //  height: textNode.height() / title.scaleX,

                    //         scaleX: 1,
                    //     });

                    // //     // props.dispatch(setTitleSize(textNode.textWidth));

                    // }}
                    onTransformEnd={(e) => {
                        const node = TextRef.current;
                        const y = node.scalex / node.width;


                        // props.dispatch(setTitleSize(node.textWidth));

                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        // node.scaleX(1);
                        // node.scaleY(1);
                        node.rotation();

                        console.log(trRefText.current.getActiveAnchor())

                        onChange({

                            ...title,
                            x: node.x(),
                            y: node.y(),
                            scaleX: node.scaleX(),
                            scaleY: node.scaleY(),

                            //  width: node.textWidth,

                            // fontSize: node.height(),
                            // width: Math.max(5, node.width()),
                            // width: (node.scaleX()/2),
                            // width: ( node.scaleY()*99),
                            // height: Math.max(5, node.height()),

                            // scaleX: 1,
                            // fontSize: trRefText.scaleX() ,
                            rotation: node.rotation(),


                        });
                    }}

                />
            )}

            {
                isShowTextarea && (
                    < Portal >
                        <TextareaAutosize
                            aria-label="empty textarea"
                            id="textarea"
                            placeholder={title.text}
                            // ref={trRefText}
                            // onDoubleClick={(e) => removeTextarea(e)}
                            onClick={() =>
                                document.getElementById('textarea').value =
                                title.text}
                            onKeyUp={onChangeTitleInput}


                            style={{
                                position: 'absolute',
                                top: title.y + position_div_y - 6 + 'px',
                                left: title.x + position_div_x + 3 + 'px',
                                // width: title.width + 10 + 'px',
                                width: widthTrText + 'px',
                                // width: "100 %",
                                lineHeight: title.lineHeight,
                                fontSize: title.fontSize * title.scaleX + 'px',
                                border: 'none',
                                padding: '5px',
                                margin: '0px',
                                overflow: 'hidden',
                                background: 'none',
                                outline: 'none',
                                resize: 'none',

                                // lineHeight: title.lineHeight,
                                fontFamily: title.fontFamily,
                                transformOrigin: 'left top',
                                textAlign: title.align,
                                color: title.fill,
                                transform: 'rotateZ(' + title.rotation + 'deg)',
                                fontStyle: title.fontStyle,
                                // scrollHeight: 'auto',
                                // height: document.getElementById("textarea").scrollHeight() + 'px',
                                // height: height1 + title.fontSize() + 'px'

                            }}
                        />

                    </Portal>
                )}

            {

                isSelected &&
                uiu &&
                (
                    <Transformer
                        // node={TextRef.current.setAttrs({
                        //     // width: (TextRef.current.width() * TextRef.current.scaleX()),

                        //     // height: textNode.height() / title.scaleX,
                        //     scaleX: 1,
                        // })}
                        ref={trRefText}
                        ignoreStroke={true}
                        resizeEnabled
                        // width={width1}
                        // height={300}
                        enabledAnchors={['bottom-left', 'bottom-right', 'top-left', 'top-right', 'middle-right', 'middle-left']}
                        // boundBoxFunc={(oldBox, newBox) => {
                        //     // limit resize
                        //     if (newBox.width < 5 || newBox.height < 5) {
                        //         return oldBox;
                        //     }
                        //     return newBox;
                        // }}
                        boundBoxFunc={(oldBox, newBox) => {
                            setWidthTrText(newBox.width);
                            newBox.width = Math.max(30, newBox.width);
                            newBox.height = Math.max(30, newBox.height);

                            return newBox;
                        }}
                    />
                )}


        </React.Fragment >
    );

};


export default connect((state) => {
    return {
        canvasDetails: state.canvasDetails.canvasDetails,
        displayComponents: state.displayComponents.displayComponents,
        grid: state.grid.grid

    },
        {}
})(TextObj)