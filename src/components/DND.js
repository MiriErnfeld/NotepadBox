import NotePad from './NotePad'
import React from 'react'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default class YourApp {
    render() {
      return (
        <DndProvider backend={HTML5Backend}>
       <NotePad></NotePad>
        </DndProvider>
      )
    }
  }