import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import MuiToolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

import DrawerContents from './DrawerContents'

const styles = theme => ({
  appBar: {
    width: `100%`,
    position: 'relative'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

class Toolbar extends Component {
  render() {
    const { classes } = this.props

    return (
      <AppBar className={ classes.appBar }>
        <MuiToolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={ this.props.handleDrawerToggle }
            className={ classes.navIconHide }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='title' color='inherit' noWrap>
            Responsive drawer
          </Typography>
        </MuiToolbar>
      </AppBar>
    )
  }
}

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Toolbar)
