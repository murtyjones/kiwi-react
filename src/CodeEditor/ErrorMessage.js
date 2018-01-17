import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'

const styles = {
  base: {
    backgroundColor: '#ff816e'
    , position: 'absolute'
    , bottom: '0'
    , right: '0'
    , left: '0'
    , top: '0'
  },
}

const ErrorMessage = (props) => {
  const { errorMsg } = props
  return (
    <Card style={ styles.base }>
      <CardHeader
        title="ERROR:"
        subtitle={ errorMsg }
        actAsExpander={ true }
        titleColor={ 'white' }
        subtitleColor={ 'white' }
      />
    </Card>
  )
}

export default ErrorMessage