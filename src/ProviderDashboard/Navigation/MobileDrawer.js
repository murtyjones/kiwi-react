import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'

import { mailFolderListItems, otherMailFolderListItems } from './tileData'
import DrawerContents from './DrawerContents'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  }
})

class ResponsiveDrawer extends React.Component {


  render() {
    const { classes, theme } = this.props

    return (
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
          open={ this.props.isOpen }
          onClose={ this.handleDrawerToggle }
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <DrawerContents />
        </Drawer>
      </Hidden>
    )
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer)
