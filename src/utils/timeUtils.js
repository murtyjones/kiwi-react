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