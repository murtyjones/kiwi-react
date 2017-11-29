import React, { Component } from 'react'
import * as T from 'prop-types'

import Menu from 'material-ui-icons/Menu'

const styles = {
  container: {
    position: 'absolute'
    , top: 0
    , left: 0
    , right: 0
    , height: '60px'
    , backgroundColor: 'white'
  },
  deleteStyle: {
    color: 'black'
    , height: '50px'
    , width: '50px'
    , position: 'absolute'
    , left: '10px'
  }
}

class SideNav extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    toggleSidebar: T.func.isRequired
    , sidebarWidth: T.number.isRequired
  }

  render() {
    return (
      <div style={ { ...styles.container, left: this.props.sidebarWidth } }>
        <Menu
          onClick={ this.props.toggleSidebar }
          style={ styles.deleteStyle }
        />
      </div>
    )
  }
}

export default SideNav