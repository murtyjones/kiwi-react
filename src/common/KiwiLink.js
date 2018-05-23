import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import { cyan500, cyan100 } from 'material-ui/styles/colors'

const kiwiLinkStyle = {
  "color": cyan500
  , textDecoration: "none"
}

const KiwiLink = props => {
  return <Link style={ kiwiLinkStyle } { ...props } />
}

export { KiwiLink }