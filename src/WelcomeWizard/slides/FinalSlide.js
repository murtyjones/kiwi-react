import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = {
  container: {
    position: 'absolute'
    , left: '50%'
    , width: '800px'
    , marginLeft: '-400px'
    , top: '50%'
    , height: '100px'
    , marginTop: '-50px'
  },
  h1: {
    textAlign: 'center'
  }
}


export default class RecoveryImages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ styles.container }>
        <h1 style={ styles.h1 }>Okay, let's code!</h1>
      </div>
    )
  }
}