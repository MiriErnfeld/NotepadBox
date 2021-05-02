// import React { useState } from 'react'
// import ReactDOM from 'react-dom';
// import $ from 'jquery'
// import './note3.css'
// function Note() {

//     // this.edit = this.edit.bind(this);
//     // this.remove = this.remove.bind(this);
//     // this.save = this.save.bind(this);
//     // this.handleClick = this.handleClick.bind(this);
//     // this.renderDisplay = this.renderDisplay.bind(this);
//     // this.renderForm = this.renderForm.bind(this);
//     const [checked, setChecked] = useState(false)
//     const [editing, setEditing] = useState(false)

//     console.log('view all props for Note class: ' + props.children);
// }

// //Event methods
// componentWillMount() {
//     this.style = {
//         right: this.randomBetween(0, window.innerWidth - 150) + 'px',
//         top: this.randomBetween(0, window.innerHeight - 150) + 'px',
//         transform: 'rotate( ' + this.randomBetween(-15, 15) + 'deg)'
//     };
// }
// // componentDidMount() {
// //     var mine = this._input;
// //     debugger
// //     $(mine).draggable( "option", "addClasses", false );
// // }
// function randomBetween(min, max) {
//     return (min + Math.ceil(Math.random() * max));
// }
// function edit() {
//     setEditing({ editing: true });
// }
// function save() {
//     props.onChange(this.refs.newText.value, props.index);
//     setEditing({ editing: false });

// }
// function remove() {
//     debugger;
//     this.props.onRemove(this.props.index);
// }
// function handleClick() {
//     setChecked({ checked: !checked });
// }

// function renderDisplay() {
//     return (
//         <div ref={(c) => _input = c} className='note' style={style}>
//             <p>{props.children}</p>
//             <span>

//                 <button onClick={edit} className='btn btn-primary glyphicon glyphicon-pencil'>edit</button>

//                 <button onClick={remove} className='btn btn-danger glyphicon glyphicon-trash'>delete</button>
//             </span>

//         </div>
//     );
// }
// function renderForm() {
//     return (
//         <div ref="myNote" className='note' style={style} >
//             <textarea ref='newText' defaultValue={props.children} className='form-control'></textarea>
//             <button className='btn btn-success btn-sm glyphicon glyphicon-floppy-disk' onClick={this.save}>save
//          </button>

//         </div>
//     );
// }
// //------------------------------------------



// return (
//     {
//         editing? 
//         renderForm
    
//             : renderDisplay
//     })


// //parent component for notes
// export default function Board() {

//     this.update = this.update.bind(this);
//     this.eachNote = this.eachNote.bind(this);
//     this.remove = this.remove.bind(this);
//     this.add = this.add.bind(this);
//     this.state = {
//         notesStringArray: []
//     }
// }

// //Event methods

// nextId() {
//     this.uniqueId = this.uniqueId || 0;
//     return this.uniqueId++;
// }
// update(newText, i) {
//     var arr = this.state.notesStringArray;
//     arr[i].note = newText;
//     this.setState({ notesStringArray: arr });
// }

// eachNote(element, i) {


//     return (
//         <Note key={element.id}
//             index={i}
//             onChange={this.update}
//             onRemove={this.remove}
//         >{element.note}</Note>
//     );
// }

// remove(index) {

//     var arr = this.state.notesStringArray;
//     var elm = arr[index];
//     arr.splice(index, 1);
//     this.setState({ notesStringArray: arr });
//     return elm;

// }
// componentWillMount() {
//     var self = this;
//     if (this.props.count) {
//         $.getJSON('http://baconipsom.com/api/?type=all-meat&sentences=' + this.props.count + '&start-with-lorem=1&callback=?', function (results) {
//             var data = results[0].split('. ').forEach(function (sentence) {
//                 self.add(sentence.substring(0, 40));
//             });
//         });
//     }
// }
// add(text) {
//     var arr = this.state.notesStringArray;
//     arr.push({
//         id: this.nextId(),
//         note: text
//     });
//     JSON.stringify(arr);
//     this.setState({ notesStringArray: arr });
// }

// render() {
//     return (
//         <div className='board'>
//             {this.state.notesStringArray.map(this.eachNote)}
//             <button
//                 className='btn btn-sm glyphicon glyphicon-plus btn-success'
//                 onClick={this.add.bind(null, "New Note!")}>+</button>
//         </div>
//     );
// }
// }


// Board.propTypes = {
//     count: function (props, propName) {

//         if (typeof props[propName] !== "number") {
//             return new Error('THe count property must be a number');

//         }

//         if (props[propName] > 100) {
//             return new Error('Creating ' + props[propName] + 'notes is ridiculous ')
//         }
//     }

// };

// ReactDOM.render(
//     <Board count={50}></Board>
//     , document.getElementById('root'));