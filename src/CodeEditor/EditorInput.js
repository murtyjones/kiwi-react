import React, { Component } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'

const styles = {
  container: {
    position: 'absolute'
    , bottom: '0'
    , right: '50%'
    , left: '0'
    , top: '0'
    , boxSizing: 'border-box'
    , borderTopLeftRadius: '10px'
    , borderBottomLeftRadius: '10px'
  }
}

const EditorInput = props =>
  <div style={ styles.container }>
    <CodeMirror
      { ...props }
    />
  </div>

export default EditorInput