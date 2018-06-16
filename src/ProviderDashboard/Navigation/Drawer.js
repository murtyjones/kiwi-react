import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MuiDrawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

import DrawerContents from './DrawerContents'

const drawerWidth = 256

const styles = theme => ({
  root: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    // display: 'flex',
    width: `${drawerWidth}px`
  },
  hidden: {
    marginRight: '10px'
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    }
    , height: 'auto'
  }
})

class Drawer extends Component {
  render() {
    const { classes, ...rest } = this.props

    return (
      <Hidden className={ classes.hidden } smDown implementation='css'>
        <div className={ classes.root }>
          <MuiDrawer
            variant='permanent'
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <DrawerContents
              { ...rest }
            />
          </MuiDrawer>
        </div>
      </Hidden>
    )
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Drawer)
