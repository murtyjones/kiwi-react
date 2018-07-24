import ApiFetch from '../../utils/ApiFetch'
import config from 'config'

const validateEmailAvailability = (values = {}, dispatch, props, blurredField) => {
  return new Promise(async (resolve, reject) => {
    if (values[blurredField] === props.initialValues[blurredField]) {
      return resolve()
    }
    const result = await ApiFetch(`${config.api}/profiles/email-availability/${values.email}`, { method: 'GET' })
    if (!result.isAvailable) {
      return reject({ email: 'That email is taken' })
    }
    return resolve()
  })
}

export default validateEmailAvailability