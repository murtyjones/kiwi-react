import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'
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
    textAlign: '-webkit-center'
  }
}


export default class RecoveryImages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ styles.container }>
        <h1 style={ styles.h1 }>Your images are saved.</h1>
      </div>
    )
  }
}