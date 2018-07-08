import React, { Fragment } from 'react'
import Route from 'react-router-dom/Route'
import { GoogleTagManager } from '../hocs/googleTagManager'

const PlainRoute = props => {

  return (
    <Fragment>
      <GoogleTagManager dataLayerName={ props.path } />
      <Route { ...props } />
    </Fragment>
  )
}

export default PlainRoute
