import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MuiDrawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'

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
    color: 'white',
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
