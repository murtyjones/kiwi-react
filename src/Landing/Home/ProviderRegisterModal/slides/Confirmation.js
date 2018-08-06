import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import ProspectiveSubscriptionTable from './ProspectiveSubscriptionTable'
import SlideInOut from '../../../../common/animations/SlideInOut'

const styles = () => ({

})

class Confirmation extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
    classes: T.object.isRequired,
    providees: T.object.isRequired,
  }

  render() {
    const { formValues: { providees } } = this.props
    const monthlySubscription = 30
    const numberOfStudents = providees.length
    const totalSubscription = numberOfStudents * monthlySubscription
    const subscriptionOrSubs = numberOfStudents > 1
      ? 'subscriptions'
      : 'subscription'

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <h5>
            Thanks for subscribing! Please review and confirm your { subscriptionOrSubs } below.
          </h5>
          <ProspectiveSubscriptionTable
            providees={ providees }
          />
          <h3>{ totalSubscription } USD /month </h3>
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Confirmation)
