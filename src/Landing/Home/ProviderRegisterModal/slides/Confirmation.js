import React, { Component } from 'react'
import * as T from 'prop-types'

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

    const students = formValues.providees
    const monthlySubscription = 30
    const numberOfStudents = students.length
    const subscriptionOrSubs = numberOfStudents > 1
      ? 'subscriptions'
      : 'subscription'

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <h5>
            Thanks for subscribing! Please review and confirm your { subscriptionOrSubs } below.
          </h5>
          { students.map((student, i) =>
            <div
              key={ i }
              className='providerRegisterForm-subscriptionDetails'
            >
              { student.username } (${monthlySubscription} per month)
            </div>
          ) }
        </div>
      </SlideInOut>
    )
  }
}
