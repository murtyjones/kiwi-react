import React, { Fragment } from 'react'
import Route from 'react-router-dom/Route'
import { GoogleTagManager } from '../hocs/googleTagManager'

const PlainRoute = props => {

  return (
    <Fragment>
      <GoogleTagManager />
      <Route { ...props } />
    </Fragment>
  )
}

export default PlainRoute
