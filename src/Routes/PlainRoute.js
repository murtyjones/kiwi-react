import React from 'react'
import Route from 'react-router-dom/Route'
import { isMobile } from 'react-device-detect'

import withTracker from '../hocs/withTracker'
import MobileRedirect from '../MobileRedirect/MobileRedirect'

const PlainRoute = ({ mobileRedirect, ...rest }) => {

  if (isMobile && mobileRedirect)
    return <MobileRedirect />

  return (
    <Route { ...rest } />
  )
}

export default withTracker(PlainRoute)
