import React, { Component } from 'react'
import * as T from 'prop-types'
import { AppBar } from 'material-ui'

import Menu from 'material-ui-icons/Menu'

const styles = {
  menu: {
    position: 'fixed'
    , top: 0
    , left: 0
    , right: 0
    , width: 'auto'
    , height: '60px'
    , backgroundColor: 'white'
    , borderBottom: '1px solid #E6E6E6'
    , margin: 0
  },
  title: {
    color: 'black'
  },
  leftIcon: {
    color: 'black'
    , height: '30px'
    , width: '30px'
    , fill: 'black'
    , position: 'relative'
    , top: '50%'
    , marginTop: '-30px'
  }
}

class TopBar extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    toggleSideNav: T.func.isRequired
    , sideNavWidth: T.number.isRequired
    , isOpen: T.bool.isRequired
    , title: T.bool.isRequired
  }

  render() {
    const { isOpen, sideNavWidth, toggleSideNav, title } = this.props

    if(!isOpen) return null

    return (
      <AppBar
        style={ {
          ...styles.menu
          , left: sideNavWidth
        } }
        iconElementLeft={
          <Menu onClick={ toggleSideNav } style={ styles.leftIcon } />
        }
        title={ title }
        titleStyle={ styles.title }
      />
    )
  }
}

export default TopBar