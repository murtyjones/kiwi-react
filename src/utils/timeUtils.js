import moment from 'moment'

export const isTokenNearExpiration = (tokenExpTimestamp) => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000),
        leewayMinutes = 60,
        leewaySeconds = leewayMinutes * 60

  const isNearExpiration = tokenExpTimestamp - currentTimestampInSeconds < leewaySeconds
  const hasExpired = hasTokenExpired(tokenExpTimestamp)

  return isNearExpiration && !hasExpired
}


export const hasTokenExpired = (tokenExpTimestamp) => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000)

  return tokenExpTimestamp - currentTimestampInSeconds < 0
}

export const sortByLatestUpdated = itemArray =>
  itemArray.sort((a, b) =>
    moment(a.updatedAt).isAfter(moment(b.updatedAt)) ? -1 : 1
  )

export const sortByOldestCreated = itemArray =>
  itemArray.sort((a, b) =>
    moment(a.createdAt).isBefore(moment(b.createdAt)) ? -1 : 1
  )