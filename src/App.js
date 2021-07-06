import './App.css';
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Configurator from './components/configurator'
import store from './components/redux/store'
import Notes from './components/myNote'
import TryDrag from './components/TryDrag';



function App() {

  return (

    <Provider store={store}>
      <div className="App">
        <Configurator></Configurator>
      {/* <TryDrag/> */}
        {/* <Notes></Notes> */}
      </div>
    </Provider>

  );
}

export default App;



// import React, { Component } from 'react'
// import ResizableRect from 'react-resizable-rotatable-draggable'

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       width: 100,
//       height: 100,
//       top: 100,
//       left: 100,
//       rotateAngle: 0
//     }
//   }

//   handleResize = (style, isShiftKey, type) => {
//     // type is a string and it shows which resize-handler you clicked
//     // e.g. if you clicked top-right handler, then type is 'tr'
//     let { top, left, width, height } = style
//     top = Math.round(top)
//     left = Math.round(left)
//     width = Math.round(width)
//     height = Math.round(height)
//     this.setState({
//       top,
//       left,
//       width,
//       height
//     })
//   }

//   handleRotate = (rotateAngle) => {
//     this.setState({
//       rotateAngle
//     })
//   }

//   handleDrag = (deltaX, deltaY) => {
//     this.setState({
//       left: this.state.left + deltaX,
//       top: this.state.top + deltaY
//     })
//   }

//   render() {
//     const {width, top, left, height, rotateAngle} = this.state
//     return (
//       <div className="App">
//         <ResizableRect
//           left={left}
//           top={top}
//           width={width}
//           height={height}
//           rotateAngle={rotateAngle}
//           // aspectRatio={false}
//           // minWidth={10}
//           // minHeight={10}
//           zoomable='n, w, s, e, nw, ne, se, sw'
//           // rotatable={true}
//           // onRotateStart={this.handleRotateStart}
//           onRotate={this.handleRotate}
//           // onRotateEnd={this.handleRotateEnd}
//           // onResizeStart={this.handleResizeStart}
//           onResize={this.handleResize}
//           // onResizeEnd={this.handleUp}
//           // onDragStart={this.handleDragStart}
//           onDrag={this.handleDrag}
//           // onDragEnd={this.handleDragEnd}
//         />
//       </div>
//     )
//   }
// }

// export default App
