import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const kiwiLinkStyle = {
  "color": "black"
}

const KiwiLink = props => {
  return <Link style={ kiwiLinkStyle } { ...props } />
}

export { KiwiLink }