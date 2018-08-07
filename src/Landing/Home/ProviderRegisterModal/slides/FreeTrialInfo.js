import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import cns from 'classnames'

import ProspectiveSubscriptionTable from './ProspectiveSubscriptionTable'
import SlideInOut from '../../../../common/animations/SlideInOut'

const styles = () => ({
  root: {
    width: '90%',
    margin: '0 auto'
  },
  sellingPoint: {
    margin: '0 0 5px 0'
  },
  first: {
    marginTop: 20
  }
})

class FreeTrialInfo extends Component {
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
    const { classes } = this.props
    const monthlySubscription = 30
    const whenToCancel = moment().add(7, 'days').format('MMMM Do')

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <div className={ classes.root }>
            Enjoy Kiwi on us for your first seven days.<br />
            <br />
            After that, you'll be charged { monthlySubscription } USD per student, per month.<br />
            <br />
            Change your mind? Cancel before { whenToCancel } to avoid being charged.<br />
            <h3 className={ cns(classes.sellingPoint, classes.first) }>No commitments</h3>
            <h3 className={ classes.sellingPoint }>Cancel at any time</h3>
          </div>
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(FreeTrialInfo)