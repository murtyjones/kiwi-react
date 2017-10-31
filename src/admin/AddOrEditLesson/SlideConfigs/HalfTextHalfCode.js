import React, { Component } from 'react'
import { Field } from 'redux-form'
import KiwiTextField from '../../../common/KiwiTextField'

class HalfCodeHalfText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { fieldRef } = this.props
    return (
      <div>
        <Field
          name={ `${fieldRef}.title` }
          component={ KiwiTextField }
        />
      </div>
    )
  }
}

export default HalfCodeHalfText