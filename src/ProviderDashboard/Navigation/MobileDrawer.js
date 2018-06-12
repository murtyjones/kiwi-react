import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import DrawerContents from './DrawerContents'

const drawerWidth = 256

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  }
})

class MobileDrawer extends React.Component {
  render() {
    const { classes, theme, ...rest } = this.props

    return (
      <Hidden mdUp>
        <Drawer
          variant='temporary'
          anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
          open={ this.props.isOpen }
          onClose={ this.props.handleDrawerToggle }
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <DrawerContents
            { ...rest }
          />
        </Drawer>
      </Hidden>
    )
  }
}

MobileDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MobileDrawer)
