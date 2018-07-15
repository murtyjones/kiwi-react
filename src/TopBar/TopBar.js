import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Menu from 'material-ui-icons/Menu'
import cns from 'classnames'

import './overrides.css'

const styles = {
  menu: {
    position: 'fixed'
    , top: 0
    , left: 0
    , right: 0
    , width: 'auto'
    , height: '60px'
    , backgroundColor: 'white'
    , borderBottom: '0px solid #E6E6E6'
    , margin: 0
  },
  title: {
    color: 'black'
    , whiteSpace: 'nowrap'
    , overflow: 'hidden'
    , textOverflow: 'ellipsis'
    , margin: '0px'
    , paddingTop: '0px'
    , letterSpacing: '0px'
    , fontSize: '28px'
    , fontWeight: '400'
    , lineHeight: '64px'
},
  leftIcon: {
    height: '30px'
    , width: '30px'
    , fill: 'black'
    , position: 'relative'
    , top: '50%'
    , marginTop: '-30px'
    , cursor: 'pointer'
  },
  appBarTitleStyle: {
    display: 'none'
  }
}

class TopBar extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    toggleSideNav: T.func.isRequired
    , sideNavWidth: T.number.isRequired
    , isOpen: T.bool.isRequired
    , title: T.string
    , titleDisabled: T.bool.isRequired
    , backgroundColor: T.string
  }

  componentWillReceiveProps(nextProps) {
    const { title, isFocused } = this.props
    const { title: nextTitle, isFocused: nextIsFocused } = nextProps

    if(title !== nextTitle) {
      this.setState({ title: nextProps.title })
    }

    if(nextIsFocused && !isFocused) {
      this.input.focus()
      this.input.setSelectionRange(this.input.value.length, this.input.value.length)
    }

    if(!nextIsFocused && isFocused) {
      this.input.blur()
    }
  }

  handleTitleChange = (e) => {
    const { handleTitleChange } = this.props
    handleTitleChange(e.target.value)
  }

  render() {
    const { isOpen, sideNavWidth, toggleSideNav, titleDisabled, title, backgroundColor, textColor } = this.props


    if(!isOpen) return null

    return (
      <AppBar
        style={ {
          ...styles.menu
          , left: sideNavWidth
          , backgroundColor: backgroundColor
        } }
        iconElementLeft={
          <Menu
            onClick={ toggleSideNav }
            style={ {
              ...styles.leftIcon
              , fill: textColor
            } }
          />
        }
        titleStyle={ styles.appBarTitleStyle }
      >
        <input
          ref={ c => this.input = c }
          className={ cns('titleInput', { 'disabled': titleDisabled } ) }
          onChange={ this.handleTitleChange }
          value={ title }
          style={ {
            ...styles.title
            , backgroundColor: backgroundColor
            , color: textColor
          } }
          disabled={ titleDisabled }
        />
      </AppBar>
    )
  }
}

export default TopBar