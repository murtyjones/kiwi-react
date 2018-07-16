import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import MuiToolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'react-router-dom/Link'

import DrawerContents from './DrawerContents'

const mainColor = '#513d80'

const styles = theme => ({
  appBar: {
    width: `100%`
    , backgroundColor: '#FFF'
    , boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1), 0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    , color: mainColor
    , position: 'relative'
    , minHeight: 50
  },
  toolbar: {
    justifyContent: 'space-between' // for explore tech island button
    , minHeight: 50
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  exploreTechIsland: {
    borderRadius: 20
  },
  exploreLink: {
    textDecoration: 'none'
  },
  '@global': {
    'img[class="kiwi-header-icon"]': {
      position: 'absolute'
      , left: '50%'
      , marginLeft: -10
      , width: 20
    }
  }
})

class Toolbar extends Component {
  render() {
    const { classes, activeIndex, onSelect, text } = this.props

    return (
      <AppBar className={ classes.appBar }>
        <MuiToolbar className={ classes.toolbar }>
          <Hidden mdUp>
            <IconButton
              aria-label='open drawer'
              onClick={ this.props.handleDrawerToggle }
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <DrawerContents
              activeIndex={ activeIndex }
              onSelect={ onSelect }
            />
          </Hidden>
          <Typography variant='title' color='inherit' noWrap>
            { text }
          </Typography>
          {/*<img*/}
            {/*className='kiwi-header-icon'*/}
            {/*src ='../../../assets/images/logo-icon.svg'*/}
          {/*/>*/}
          <Link to='/lessons' className={ classes.exploreLink } target='_blank'>
            <Button
              classes={{
                root: classes.exploreTechIsland
              }}
              variant='outlined'
            >
              Explore Tech Island!
            </Button>
          </Link>
        </MuiToolbar>
      </AppBar>
    )
  }
}

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles, { withTheme: true })(Toolbar))
