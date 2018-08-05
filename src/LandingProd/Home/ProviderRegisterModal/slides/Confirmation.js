import React, { Component } from 'react'
import * as T from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import withStyles from '@material-ui/core/styles/withStyles'

import ProspectiveSubscriptionTable from './ProspectiveSubscriptionTable'
import SlideInOut from '../../../../common/animations/SlideInOut'

const styles = () => ({
  table: {
    width: '80%',
    margin: '0 auto'
  },
  '@global': {
    'th, td': {
      textAlign: 'center !important'
    }
  }
})

class Confirmation extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
    providees: T.object.isRequired,
  }

  render() {
    const { providees, classes } = this.props
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
