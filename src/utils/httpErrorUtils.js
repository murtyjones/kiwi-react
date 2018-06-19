import get from 'lodash/get'

export const getError = response =>
  get(response, 'message', '') ||
  get(response, 'body.message', '') ||
  get(response, 'description', '') ||
  get(response, 'description', '')


export const genericLoginFailure = message =>
  message.toLocaleLowerCase().includes('wrong email')
    ? `That account doesn't exist or your password is wrong!`
    : message
