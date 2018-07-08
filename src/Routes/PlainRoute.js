import React, { Fragment } from 'react'
import Route from 'react-router-dom/Route'
import withTracker from '../hocs/withTracker'
import { GoogleTagManager } from '../hocs/googleTagManager'

const PlainRoute = props => {

  return (
    <Fragment>
      <GoogleTagManager dataLayer={ props.path } />
      <Route { ...props } />
    </Fragment>
  )
}

export default withTracker(PlainRoute)
