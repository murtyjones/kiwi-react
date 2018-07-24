import ApiFetch from '../utils/ApiFetch'
import config from 'config'


const usernameAvailability = (values/*, dispatch*/) => {
  const options = {
    method: 'GET'
  }

  return ApiFetch(`${config.api}/profiles/usernames/${values.username}`, options)
  .then(result => {
    if (result.isUsernameReserved)
      throw { username: 'Username is taken!' }
  })

}

export default usernameAvailability