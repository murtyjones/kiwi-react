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

const mainColor = '#513d80'

const styles = theme => ({
  appBar: {
    width: `100%`
    , position: 'relative'
    , backgroundColor: '#FFF'
    , boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1), 0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    , color: mainColor
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
    const { classes, text } = this.props

    return (
      <AppBar className={ classes.appBar }>
        <MuiToolbar className={ classes.toolbar }>
          <IconButton
            color={ mainColor }
            aria-label='open drawer'
            onClick={ this.props.handleDrawerToggle }
            className={ classes.navIconHide }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='title' color='inherit' noWrap>
            { text }
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
