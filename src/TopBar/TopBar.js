import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'
import AppBar from '@material-ui/core/AppBar'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import { white } from '../colors'
import { setTopBarTitle } from '../actions'
import { connect } from 'react-redux'

const styles = () => ({
  root: {
    position: 'fixed'
    , top: 0
    , left: 0
    , right: 0
    , width: 'auto'
    , height: '60px'
    , backgroundColor: 'white'
    , borderBottom: '0px solid #E6E6E6'
    , margin: 0,
    '& input': {
      'outline': 0,
      border: 'none',
      '-webkit-appearance': 'none'
    },
    '& button': {
      margin: '0 10px',
      height: '100%',
      fontSize: 20,
      border: 'none',
      background: 'none',
      color: white,
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'
      }
    }
  },
  grid: {
    margin: 0,
    height: '100%', // needed for firefox
    width: '100%',
    flexGrow: 1
  },
  gridItem: {
    height: '100%'  // needed for firefox
  },
  title: {
    width: '100%'
    , color: 'black'
    , '-webkit-text-fill-color': white
    , '-webkit-opacity': 1
    , whiteSpace: 'nowrap'
    , overflow: 'hidden'
    , textOverflow: 'ellipsis'
    , margin: '0px'
    , paddingTop: '0px'
    , letterSpacing: '0px'
    , fontSize: '28px'
    , fontWeight: '400'
    , display: 'inline-block'
    , minWidth: '200px'
  },
  share: {
    width: 'calc(100% - 100px)'
  },
  signout: {
    width: 100
  },
  middle: {
    textAlign: 'center',
    WebkitTextAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },
  breadcrumb: {
    marginRight: 10,
    padding: 0,
    display: 'inline-block',
    color: white,
    fontSize: 16,
    '&:hover': {
      textDecoration: 'none !important',
      // borderBottom: `1px solid ${white}`
    }
  },
  breadcrumbIcon: {
    fontSize: 21,
    position: 'relative',
    top: 5
  },
  expandIcon: {
    fontSize: 20,
    position: 'relative',
    top: 4
  }
})

const Signout = ({ className }) =>
  <Link to='/signout'><button id='signout' className={ className }>Sign Out</button></Link>
Signout.propTypes = { className: T.string.isRequired }

class TopBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    };

  }

  static propTypes = {
    isOpen: T.bool.isRequired
    , title: T.string
    , breadcrumbLink: T.string.isRequired
    , breadcrumbText: T.string.isRequired
    , textColor: T.string
    , titleDisabled: T.bool.isRequired
    , isFocused: T.bool.isRequired
    , setTopBarTitle: T.func
    , setTopBarMiddleSectionIsVisible: T.func
    , backgroundColor: T.string
    , classes: T.object
    , history: T.object.isRequired
    , isAdmin: T.bool.isRequired
    , isProvider: T.bool.isRequired
    , showMiddleSection: T.bool.isRequired
    , showLogo: T.bool.isRequired
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    const { title, isFocused } = this.props
    const { title: nextTitle, isFocused: nextIsFocused } = nextProps

    if (title !== nextTitle) {
      this.setState({ title: nextProps.title })
    }

    if (nextIsFocused && !isFocused) {
      this.input.focus()
      this.input.setSelectionRange(this.input.value.length, this.input.value.length)
    }

    if (!nextIsFocused && isFocused) {
      this.input.blur()
    }
  }

  handleTitleChange = (e) => {
    this.props.setTopBarTitle(e.target.value)
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  goTo = link => {
    this.props.history.push(link)
    this.handleClose()
  }

  render() {
    const {
      showMiddleSection, classes, isOpen, titleDisabled, title, backgroundColor,
      textColor, isAdmin, isProvider, breadcrumbLink, breadcrumbText, showLogo
    } = this.props
    const { anchorEl } = this.state

    if (!isOpen)
      return null

    return (
      <AppBar
        id='top-bar'
        className={ classes.root }
        style={ { backgroundColor } }
      >
        <Grid container className={ classes.grid } spacing={ 24 }>

          <Grid item className={ classes.gridItem } xs={ showMiddleSection ? 3 : 6 }>

            { !!breadcrumbLink &&
              <Link to={ breadcrumbLink ? breadcrumbLink : '/' }>
                <button id='breadcrumb' className={ classes.breadcrumb }>
                  <ChevronLeft
                    viewBox='7 3 16 20'
                    className={ classes.breadcrumbIcon }
                  />
                  { breadcrumbText }
                </button>
              </Link>
            }

            { showLogo &&
              <Link id='logo-link' to={ isProvider ? '/provider/dashboard' : '/lessons' }>
                <img
                  height='100%'
                  src='https://res.cloudinary.com/kiwi-prod/image/upload/v1535129642/Logos/kiwi_logo_white_v2.svg'
                />
              </Link>
            }

            { !showLogo && // if logo, no title
              <input
                id='top-bar-title'
                ref={ c => this.input = c }
                className={ cns(classes.title, {
                  'disabled': titleDisabled,
                  [classes.share]: !!breadcrumbLink
                } ) }
                onChange={ this.handleTitleChange }
                value={ title }
                style={ { backgroundColor, color: textColor } }
                disabled={ titleDisabled }
              />
            }
          </Grid>

          { showMiddleSection &&
            <Grid item className={ classes.middle } xs={ 6 }>
              { isAdmin &&
                <button
                  aria-owns={ anchorEl ? 'admin-menu' : null }
                  aria-haspopup='true'
                  onClick={ this.handleClick }
                >
                  Admin
                  <ExpandMore className={ classes.expandIcon }/>
                </button>
              }
              { (isAdmin || isProvider) &&
                <button id='go-to-dashboard' onClick={ () => this.props.history.push('/provider/dashboard') }>
                  Parent Dashboard
                </button>
              }
              { isAdmin &&
                <Menu
                  id='admin-menu'
                  anchorEl={ anchorEl }
                  open={ Boolean(anchorEl) }
                  onClose={ this.handleClose }
                >
                  <MenuItem onClick={ () => this.goTo('/lessons') }>Student Map</MenuItem>
                  <MenuItem onClick={ () => this.goTo('/admin/lessons') }>Edit Lessons</MenuItem>
                  <MenuItem onClick={ () => this.goTo('/admin/variables') }>Global User Variables</MenuItem>
                  <MenuItem onClick={ () => this.goTo('/admin/subscriptions') }>Subscriptions</MenuItem>
                  <MenuItem onClick={ () => this.goTo('/admin/signups') }>Signups</MenuItem>
                </Menu>
              }
            </Grid>
          }

          <Grid item className={ classes.right } xs={ showMiddleSection ? 3 : 6 }>
            <Signout className={ classes.signout } />
          </Grid>

        </Grid>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    auth: { isAdmin, isProvider },
    topBar,
    globalColors,
  } = state

  return {
    isAdmin: isAdmin,
    isProvider: isProvider,
    showMiddleSection: topBar.showMiddleSection,
    showLogo: topBar.showLogo,
    breadcrumbLink: topBar.breadcrumbLink,
    breadcrumbText: topBar.breadcrumbText,
    isOpen: topBar.isTopBarOpen,
    backgroundColor: globalColors.primaryColor,
    textColor: globalColors.textColor,
    isFocused: topBar.topBarFocused,
    title: topBar.topBarTitle,
    titleDisabled: topBar.topBarTitleDisabled,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTopBarTitle: (title) => dispatch(setTopBarTitle(title))
  }
}


TopBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar))

TopBar = withStyles(styles)(TopBar)

export default TopBar