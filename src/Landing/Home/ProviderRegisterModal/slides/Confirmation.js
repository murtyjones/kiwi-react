import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import ProspectiveSubscriptionTable from './ProspectiveSubscriptionTable'
import SlideInOut from '../../../../common/animations/SlideInOut'

const styles = () => ({
  root: {
    width: '90%',
    margin: '0 auto'
  }
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
    const { classes, formValues: { providees } } = this.props
    const monthlySubscription = 30
    const numberOfStudents = providees.length
    const totalSubscription = numberOfStudents * monthlySubscription
    const subscriptionOrSubs = numberOfStudents > 1
      ? 'subscriptions'
      : 'subscription'

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <div className={ classes.root }>
            <h5>
              Thanks for subscribing! Please review and confirm your { subscriptionOrSubs } below.<br />
              <br />
              Remember, you won't be charged until your free trial ends.
            </h5>
            <ProspectiveSubscriptionTable
              providees={ providees }
            />
            <h3>{ totalSubscription } USD /month </h3>
          </div>
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Confirmation)
