import moment from 'moment'
import { SUBSCRIPTION_STATUSES } from '../constants'

export const isPastPastPeriodEnd = subscription =>
  moment.unix(subscription.currentPeriodEnd).isBefore()

export const isSubscriptionValid = subscription => {
  if (!subscription)
    return false

  if (subscription.status !== SUBSCRIPTION_STATUSES.ACTIVE) {
    if (
      !subscription.cancelAtPeriodEnd ||
      isPastPastPeriodEnd(subscription)
    ) {
      return false
    }
  }

  return true
}
