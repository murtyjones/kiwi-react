import React from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Link from 'react-router-dom/Link'
import Edit from '@material-ui/icons/Edit'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import withStyles from '@material-ui/core/styles/withStyles'

import { SUBSCRIPTION_STATUSES } from '../../constants'
import AuthService from '../../utils/AuthService'

const editUserColor = '#0074D9'

const styles = theme => ({

  editUserButton: {
    width: '30px !important',
    height: '30px !important',
    marginLeft: '10px !important'
  },
  toggleSubscription: {
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
    width: '35%',
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
    color: editUserColor
  },
  row: {
    borderTop: '1px solid #DDD',
    borderBottom: '1px solid #DDD'
  },
  '@global': {
    'tr > td': {
      fontSize: '12pt !important',
      border: 'none'
    },
    'tr:nth-child(odd)': {
      backgroundColor: '#fafafa'
    }
  }
})

const SubscriptionsTable = ({
  classes, sortedSubscriptions, profilesById, isUpdatingSubscription, handleSubscriptionClick, toggleSubscriptionStatus
}) => {

  if (isEmpty(sortedSubscriptions)) {
    return 'No subscriptions yet...'
  }

  return (
    <Table>
      <TableBody>
        { sortedSubscriptions.map((subscription, i) => {
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
                      ? 'Expires '
                      : 'Expired '
                    : 'Renews on ' }
                  { current_period_end.format('MMMM Do') }
                </span>
              </TableCell>
              <TableCell
                className={
                  cns(classes.toggleSubscription, {
                    [classes.disabled]: isUpdatingSubscription
                  })
                }
              >
                <Link to='#'
                  onClick= { isUpdatingSubscription ? null : () =>
                    toggleSubscriptionStatus(subscription)
                  }
                >
                  { subscription.status === SUBSCRIPTION_STATUSES.INACTIVE
                    ? 'Restart Subscription'
                    : 'Cancel Subscription'
                  }
                </Link>
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