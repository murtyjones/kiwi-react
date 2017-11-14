import React, { Component } from 'react'
import * as T from 'prop-types'
import { Drawer } from 'material-ui'

const styles = {
  container: {
    width: '100%'
  },
  stage: {
    width: '700px',
    height: '400px',
  },
  layer1: {
    width: '100%',
    height: '400px',
  }
}

class SideNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Drawer />
    )
  }
}

export default SideNav