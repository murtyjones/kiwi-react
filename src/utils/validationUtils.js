export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined


export const required = value => (value ? undefined : 'Required')


export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength3 = minLength(3)
export const minLength6 = minLength(6)


export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength20 = maxLength(20)


export const passwordsMatch = (password, confirmPassword) => {
  return password && confirmPassword && password === confirmPassword
}
