import ApiFetch from '../../utils/ApiFetch'
import config from 'config'
import { stopAsyncValidation } from 'redux-form'

const validateEmailAvailability = (values = {}, dispatch, props, blurredField) => {
  return new Promise(async (resolve, reject) => {
    if(values[blurredField] === props.initialValues[blurredField]) {
      return resolve()
    }
    const result = await ApiFetch(`${config.api}/profiles/email-availability/${values.email}`, { method: 'GET' })
    if(!result.isAvailable) {
      reject({ email: 'That email is taken' })
    }
  })
}

export default validateEmailAvailability