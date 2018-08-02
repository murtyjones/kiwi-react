import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'


const styles = () => ({
  root: {
    position: 'absolute'
    , top: 20
    , right: 50
    , zIndex: 52 // just in front of dynamicHeader
    , color: '#FFF'
    , padding: '10px 30px'
    , borderRadius: 25
    , fontSize: '13pt'
    , border: '2px solid rgb(98, 79, 143)'
    , fontWeight: 'bold'
    , cursor: 'pointer'
    , width: 125
    , marginLeft: -85
    , backgroundColor: 'rgb(98, 79, 143)'
    , textAlign: 'center'
    , '-webkit-text-align': 'center'
    , fontFamily: 'Arvo'
    , '& a ': {
      color: '#FFF'
      , textDecoration: 'none'
    }
  }
})

let LoginLink = ({ classes, onClick }) =>
  <button onClick={ onClick } className={ cns('hvr-grow', classes.root) }>
      log in
  </button>


LoginLink = withStyles(styles, { withTheme: true })(LoginLink)


export { LoginLink }