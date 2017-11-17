import React, { Component } from 'react'
import * as T from 'prop-types'
import { Drawer, Menu, MenuItem } from 'material-ui'
import Circle from 'material-ui-icons/FiberManualRecord'
import { KiwiLink } from "../common/KiwiLink"

const p = 20

const styles = {
  header: {
    backgroundColor: '#808080'
    , height: '200px'
    , width: '100%'
    , paddingTop: `${p}px`
    , position: 'relative'
  },
  logo: {
    backgroundColor: '#FFF'
    , height: '70px'
    , width: `${256 - (p*2)}px`
    , margin: 'auto'
  },
  menu: {
    paddingTop: 0
    , width: '256px'
    , fontWeight: 'bold'
  },
  menuItem: {
    padding: '10px 20px'
    , height: '70px'
    , width: '100%'
    , display: 'block'
  },
  menuItemBottom: {
    position: 'absolute'
    , bottom: 0
  },
  menuItemInner: {
    padding: '0'
    , height: '50px'
    , contentAlign: 'center'
  },
  circle: {
    width: '45px'
    , height: '45px'
    , margin: 0
    , padding: 0
    , display: 'inline-block'
  },
  menuText: {
    height: '50xp'
    , display: 'inline-block'
  }
}

class SideNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Drawer>
        <Menu style={ styles.menu } listStyle={ styles.menu } autoWidth={ false }>
          <div style={ styles.header }>
            <div style={ styles.logo } />
            <MenuItem
              style={ {... styles.menuItem, ...styles.menuItemBottom } }
              leftIcon={
                <Circle style={ styles.circle } color={ 'white' } viewBox={ '4 4 16 16' } />
              }
              primaryText={ 'First name' }
            />
          </div>
          <div style={ styles.body }>
            <KiwiLink to='/lessons'>
              <MenuItem
                style={ styles.menuItem }
                leftIcon={
                  <Circle style={ styles.circle } color={ '#CCCCCC' } viewBox={ '4 4 16 16' } />
                }
                primaryText={ 'Lessons' }
              />
            </KiwiLink>
            <KiwiLink to='/projects'>
              <MenuItem
                style={ styles.menuItem }
                leftIcon={
                  <Circle style={ styles.circle } color={ '#CCCCCC' } viewBox={ '4 4 16 16' } />
                }
                primaryText={ 'Projects' }
              />
            </KiwiLink>
          </div>
        </Menu>
      </Drawer>
    )
  }
}

export default SideNav