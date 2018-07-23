import React from 'react'
import Route from 'react-router-dom/Route'
import { isMobile } from 'react-device-detect'

import MobileRedirect from '../MobileRedirect/MobileRedirect'

const PlainRoute = ({ redirectIfMobile, ...rest }) => {

  if (isMobile && redirectIfMobile)
    return <MobileRedirect />

  return (
    <Route { ...rest } />
  )
}

export default PlainRoute
