import ApiFetch from '../../utils/ApiFetch'
import config from 'config'

const validateUsernameAvailability = (values = {}, dispatch, props, blurredField) => {
  return new Promise(async (resolve, reject) => {
    if(values[blurredField] === props.initialValues[blurredField]) {
      return resolve()
    }
    const result = await ApiFetch(`${config.api}/profiles/usernames/${values.username}`, { method: 'GET' })
    if(result.isUsernameReserved) {
      return reject({ username: 'That username is taken' })
    }
    return resolve()
  })
}

export default validateUsernameAvailability