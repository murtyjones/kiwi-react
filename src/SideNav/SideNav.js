import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { Drawer, Menu, MenuItem, Subheader, Divider } from 'material-ui'
import Circle from 'material-ui-icons/FiberManualRecord'
import Map from 'material-ui-icons/Map'
import Work from 'material-ui-icons/Work'
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew'
import Description from 'material-ui-icons/Description'
import { KiwiLink } from "../common/KiwiLink"

const p = 20

const styles = {
  header: {
    backgroundColor: '#808080'
    , height: '90px'
    , width: '100%'
    , paddingTop: `${p}px`
    , position: 'relative'
  },
  logo: {
    height: '60px'
    , width: `${256 - (p*2)}px`
    , margin: 'auto'
    , backgroundImage: 'url(../../assets/images/landing-logo.svg)'
    , backgroundRepeat: 'no-repeat'
    , backgroundPosition: 'center'
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
  menuItemBottomUp: {
    position: 'absolute'
    , bottom: '70px'
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
  },
  subheader: {
    fontWeight: 'bold'
    , paddingLeft: '20px'
  }
}

class SideNav extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    isAdmin: T.bool.isRequired
    , isOpen: T.bool.isRequired
    , isLoggedIn: T.bool.isRequired
  }

  render() {
    const { isOpen, isAdmin, isLoggedIn, secondaryColor, toggleSideNav } = this.props

    return (
      <Drawer
        open={ isOpen }
        docked={ false }
        onRequestChange={ toggleSideNav }
      >
        <Menu style={ styles.menu } listStyle={ styles.menu } autoWidth={ false }>
          <div style={ { ...styles.header,  backgroundColor: secondaryColor } }>
            <div style={ styles.logo } />
            {/*<MenuItem*/}
              {/*key={ 'name' }*/}
              {/*style={ { color: '#FFFFFF', ...styles.menuItem, ...styles.menuItemBottom } }*/}
              {/*leftIcon={*/}
                {/*<Circle style={ styles.circle } color={ 'white' } viewBox={ '4 4 16 16' } />*/}
              {/*}*/}
              {/*primaryText={ 'First name' }*/}
              {/*onClick={ toggleSideNav }*/}
            {/*/>*/}
          </div>
          <div style={ styles.body }>
            <KiwiLink to='/lessons'>
              <MenuItem
                key={ 'lessons' }
                style={ styles.menuItem }
                leftIcon={
                  <Map style={ styles.circle } color={ secondaryColor } viewBox={ '1 1 21 21' } />
                }
                primaryText={ 'Lessons' }
                onClick={ toggleSideNav }
              />
            </KiwiLink>
            <KiwiLink to='/projects'>
              <MenuItem
                key={ 'projects' }
                style={ styles.menuItem }
                leftIcon={
                  <Work style={ styles.circle } color={ secondaryColor } viewBox={ '1 1 21 21' } />
                }
                primaryText={ 'Projects' }
                onClick={ toggleSideNav }
              />
            </KiwiLink>
            { isAdmin &&
              [
                <Divider key={ 0 } />
                ,
                <Subheader
                  key={ 1 }
                  style={ styles.subheader }
                >
                  Admin
                </Subheader>
                ,
                <KiwiLink
                  key={ 2 }
                  to='/admin/lessons'
                >
                  <MenuItem
                    key={ 'admin/lessons' }
                    style={ styles.menuItem }
                    leftIcon={
                      <Circle style={ styles.circle } color={ secondaryColor } viewBox={ '4 4 16 16' } />
                    }
                    primaryText={ 'Add/Edit Lessons' }
                    onClick={ toggleSideNav }
                  />
                </KiwiLink>
                ,
                <KiwiLink
                  key={ 3 }
                  to='/admin/lessons/themes'
                >
                  <MenuItem
                    key={ 'admin/lessons/themes' }
                    style={ styles.menuItem }
                    leftIcon={
                      <Circle style={ styles.circle } color={ secondaryColor } viewBox={ '4 4 16 16' } />
                    }
                    primaryText={ 'Add/Edit Themes' }
                    onClick={ toggleSideNav }
                  />
                </KiwiLink>
              ]
            }
            { isLoggedIn &&
              <KiwiLink to='/signout'>
                <MenuItem
                  key={ 'signout' }
                  style={ { color: '#000000', ...styles.menuItem, ...styles.menuItemBottomUp } }
                  leftIcon={
                    <PowerSettingsNew style={ styles.circle } color={ secondaryColor } viewBox={ '1 1 21 21' } />
                  }
                  primaryText={ 'Sign out' }
                />
              </KiwiLink>
            }
            <KiwiLink to='/legal'>
              <MenuItem
                key={ 'legal' }
                style={ { color: '#000000', ...styles.menuItem, ...styles.menuItemBottom } }
                leftIcon={
                  <Description style={ styles.circle } color={ secondaryColor } viewBox={ '1 1 21 21' } />
                }
                primaryText={ 'Legal' }
              />
            </KiwiLink>
          </div>
        </Menu>
      </Drawer>
    )
  }
}

export default SideNav