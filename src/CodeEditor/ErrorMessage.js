import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'

const styles = {
  base: {
    backgroundColor: '#ffcdcd'
    , fontFamily: 'Monospace'
    , position: 'absolute'
    , bottom: '0'
    , right: '0'
    , left: '0'
    , top: '0'
    , color: '#858585'
    , padding: '15px'
    , borderRadius: '0 10px 10px 0'
    , border: '#CCCCCC'
  }
}

const ErrorMessage = (props) => {
  const { errorMsg } = props
  return (
    <div style={ styles.base }>
      <div>ERROR:</div>
      <div>{ errorMsg }</div>
    </div>
  )
}

export default ErrorMessage