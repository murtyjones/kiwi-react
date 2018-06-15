import moment from 'moment'

export const isTokenNearExpiration = (expTimestamp) => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000),
        leewayMinutes = 60,
        leewaySeconds = leewayMinutes * 60

  const isNearExpiration = expTimestamp - currentTimestampInSeconds < leewaySeconds
  const hasExpired = hasTokenExpired(expTimestamp)

  return isNearExpiration && !hasExpired
}


export const hasTokenExpired = (expTimestamp) => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000)

  return expTimestamp - currentTimestampInSeconds < 0
}

export const sortByLatestUpdated = itemArray =>
  itemArray.sort((a, b) =>
    moment(a.updatedAt).isAfter(moment(b.updatedAt)) ? -1 : 1
  )

export const sortByOldestCreated = itemArray =>
  itemArray.sort((a, b) =>
    moment(a.createdAt).isBefore(moment(b.createdAt)) ? -1 : 1
  )

export const tokenNeedsRefresh = (exp, iat) => {
  const issuedOverAnHourAgo = moment.unix(iat).add(30, 'second').isBefore()
  const isNotExpired = moment.unix(exp).isAfter()
  return issuedOverAnHourAgo && isNotExpired
}
