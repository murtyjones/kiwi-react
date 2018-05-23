import React, { Component } from 'react'
import Link from 'react-router-dom/Link'


const styles = {
  linkContainerStyle: {
    position: 'absolute'
    , textAlign: 'center'
    , paddingTop: '10px'
    , paddingRight: '15px'
    , zIndex: 20
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
        , right: '100px'
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