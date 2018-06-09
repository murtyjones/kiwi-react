import React, { Component } from 'react'
import Link from 'react-router-dom/Link'


const styles = {
  linkContainerStyle: {
    position: 'absolute'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
    , zIndex: 52 // just in front of dynamicHeader
  },
  linkStyle: {
    borderBottom: '2px #FFFFFF solid'
    , paddingBottom: '3px'
    , cursor: 'pointer'
    , fontSize: '16pt'
    , color: '#FFF'
    , textDecoration: 'none'
  }
}


export class AboutLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ {
        ...styles.linkContainerStyle
        , top: '20px'
        , right: '10px'
        , width: '100px'
      } }
      >
          <Link
            to='/about'
            style={ styles.linkStyle }
          >
            about us
          </Link>
      </div>
    )
  }
}

export class HomeLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ {
        ...styles.linkContainerStyle
        , top: '20px'
        , right: '10px'
        , width: '100px'
      } }
      >
        <Link
          to='/'
          style={ styles.linkStyle }
        >
          home
        </Link>
      </div>
    )
  }
}
