import React, { Component } from 'react'

const styles = {
  loginButtonContainer: {
    position: 'absolute'
    , top: '20px'
    , right: '0'
    , width: '60px'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
    , zIndex: 20
  },
  loginButton: {
    borderBottom: '2px #FFFFFF solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
    , fontSize: '16pt'
  }
}

export default class LoginLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ styles.loginButtonContainer } >
          <span
            onClick={ this.props.openDrawer }
            style={ styles.loginButton }
          >
            log in
          </span>
      </div>
    )
  }
}
