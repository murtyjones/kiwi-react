export const isTokenNearExpiration = (tokenExpTimestamp) => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000),
        leewayMinutes = 5,
        leewaySeconds = leewayMinutes * 60


  return tokenExpTimestamp - currentTimestampInSeconds < leewaySeconds
}