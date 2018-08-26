import React from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import withStyles from '@material-ui/core/styles/withStyles'

import { COUPON_LANGUAGE, SUBSCRIPTION_STATUSES } from '../../constants'
import AuthService from '../../utils/AuthService'
import { oceanBlue, successGreen } from '../../colors'

export const getIsInTrialPeriod = subscription => {
  return subscription.trial_end
    ? moment.unix(subscription.trial_end).isAfter() /* is after now */
    : null
}


const styles = theme => ({
  root: {
    '& td': {
      fontSize: '12pt !important',
      border: 'none'
    },
    '& tr:nth-child(odd)': {
      backgroundColor: '#fafafa'
    }
  },
  editUserButton: {
    width: '30px !important',
    height: '30px !important',
    marginLeft: '10px !important'
  },
  toggleSubscription: {
    textAlign: 'right',
    padding: '0 !important',
  },
  disabled: {
    cursor: 'default',
    opacity: 0.5
  },
  temporaryPassword: {
    display: 'block',
    fontStyle: 'italic',
    fontSize: '80%'
  },
  periodEnd: {
    width: '33%',
    padding: '0 !important'
  },
  cancelAtPeriodEnd: { color: 'darkred' },
  username: {
    width: '30%',
    padding: '0 !important'
  },
  editUserIcon: {
    width: '20px',
    height: '20px',
    color: oceanBlue
  },
  monthlyPrice: {
    width: 140,
    padding: 0
  },
  row: {
    borderTop: '1px solid #DDD',
    borderBottom: '1px solid #DDD'
  },
  discountMessage: {
    fontSize: '8pt',
    color: successGreen
  }
})

const SubscriptionsTable = ({
  classes, sortedSubscriptions, profilesById, isUpdatingSubscription, handleSubscriptionClick, toggleSubscriptionStatus
}) => {
  if (isEmpty(sortedSubscriptions)) {
    return 'No subscriptions yet...'
  }
  return (
    <Table className={ classes.root }>
      <TableBody>
        { sortedSubscriptions.map((subscription, i) => {
          const discountMessage = COUPON_LANGUAGE[subscription.discountCode]
          const isInTrialPeriod = getIsInTrialPeriod(subscription)
          const providee = profilesById[subscription.provideeId] || {}
          const current_period_end = moment.unix(subscription.current_period_end)
          const provideeDisplayName = AuthService.isPlaceholderUsernameFromUsername(providee.username || '')
            ? `${providee.firstName} ${providee.lastName}`
            : providee.username
          return (
            <TableRow className={ classes.row } key={ i }>
              <TableCell className={ classes.username }>
                { provideeDisplayName }
                <IconButton
                  variant='fab'
                  aria-label='add'
                  className={ classes.editUserButton }
                  onClick={ e => handleSubscriptionClick(e, subscription._id) }
                >
                  <Edit
                    className={ classes.editUserIcon }
                  />
                </IconButton>
                { providee.temporaryPassword &&
                  <span className={ classes.temporaryPassword }>
                    <b>Temporary Password:</b> { providee.temporaryPassword }
                  </span>
                }
              </TableCell>
              <TableCell className={ classes.periodEnd }>
                <span
                  className={ cns({
                    [classes.cancelAtPeriodEnd]: subscription.cancel_at_period_end
                  }) }
                >
                  { subscription.cancel_at_period_end
                    ? current_period_end.isAfter() // isAfter now
                      ? 'Expires ' : 'Expired '
                      : isInTrialPeriod ? 'Trial ends on ' : 'Renews on '
                    }
                  { current_period_end.format('MMMM Do') }
                </span>
              </TableCell>
              <TableCell className={ classes.monthlyPrice }>
                30 USD / mo.<br />
                { isInTrialPeriod && !subscription.cancel_at_period_end && discountMessage &&
                <span className={ classes.discountMessage }>{ discountMessage }</span>
                }
              </TableCell>
              <TableCell
                className={
                  cns(classes.toggleSubscription, {
                    [classes.disabled]: isUpdatingSubscription
                  })
                }
              >
                <Button
                  variant='flat'
                  disabled={ isUpdatingSubscription }
                  onClick= { () => toggleSubscriptionStatus(subscription._id, isInTrialPeriod) }>
                  { subscription.status === SUBSCRIPTION_STATUSES.INACTIVE
                    ? isInTrialPeriod ? 'Restart Free Trial' : 'Restart Subscription'
                    : isInTrialPeriod ? 'Pause Free Trial' : 'Cancel Subscription'
                  }
                </Button>
              </TableCell>
            </TableRow>
          )
        }) }
      </TableBody>
    </Table>
  )
}

SubscriptionsTable.propTypes = {
  classes: T.object.isRequired,
  sortedSubscriptions: T.array.isRequired,
  profilesById: T.object.isRequired,
  isUpdatingSubscription: T.bool.isRequired,
  handleSubscriptionClick: T.func.isRequired,
  toggleSubscriptionStatus: T.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(SubscriptionsTable)