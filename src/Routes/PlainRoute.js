import React from 'react'
import Route from 'react-router-dom/Route'
import withTracker from '../hocs/withTracker'

const PlainRoute = props => {
  return (
    <Route { ...props } />
  )
}

export default withTracker(PlainRoute)
