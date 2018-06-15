import React from 'react'
import Route from 'react-router-dom/Route'
import withTracker from '../hocs/withTracker'

const PlainRoute = props => {
  return (
    <PlainRoute { ...props } />
  )
}

export default withTracker(PlainRoute)
