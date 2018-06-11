import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'

import SlideInOut from '../../../../common/animations/SlideInOut'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
  }

  render() {
    const { formValues } = this.props
    const numberOfStudents = formValues.providees.length
    // 2 accounts for empty providee
    const numText = numberOfStudents > 2
      ? 'students'
      : 'student'
    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <h4>
            We're excited for your { numText }
          </h4>


        </div>
      </SlideInOut>
    )
  }
}
