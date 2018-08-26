import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import cns from 'classnames'

import ProspectiveSubscriptionTable from './ProspectiveSubscriptionTable'
import SlideInOut from '../../../../common/animations/SlideInOut'
import { COUPON_DETAILS } from '../../../../constants'
import { darkPurple, successGreen } from '../../../../colors'

const styles = () => ({
  root: {
    width: '90%',
    margin: '0 auto'
  },
  h3: {
    marginBottom: 2
  },
  beginsAfter: {
    fontSize: 11,
    fontStyle: 'italic'
  },
  discounted: {
    color: successGreen
  },
  thereafter: {
    color: '#2E2860',
    fontSize: '10pt'
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

  getDiscountedPrice = (totalSubscription, numberOfStudents, discountValueDetails) => {
    if (discountValueDetails.type === 'percent') {
      return totalSubscription * (100 - discountValueDetails.value) / 100
    } else if (discountValueDetails.type === 'dollars') {
      return totalSubscription - (discountValueDetails.value * numberOfStudents)
    }
  }

  render() {
    const { classes, formValues: { providees, discountCode } } = this.props
    const monthlySubscription = 30
    const numberOfStudents = providees.length
    const totalSubscription = numberOfStudents * monthlySubscription
    const whenToCancel = moment().add(7, 'days').format('MMMM Do')
    const subscriptionOrSubs = numberOfStudents > 1
      ? 'subscriptions'
      : 'subscription'
    const discountValueDetails = COUPON_DETAILS[discountCode]


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
              discountValueDetails={ discountValueDetails }
            />
            { !discountValueDetails ?
              <h3 className={ classes.h3 }>
                { totalSubscription } USD /month
              </h3>
              :
              <h3 className={ cns(classes.h3, classes.discounted) }>
                { this.getDiscountedPrice(totalSubscription, numberOfStudents, discountValueDetails) } USD for the first month.<br />
                <span className={ classes.thereafter }>{ totalSubscription } USD after the first month.</span>
              </h3>
            }
            <span className={ classes.beginsAfter }>(Free trial ends { whenToCancel })</span>
          </div>
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Confirmation)
