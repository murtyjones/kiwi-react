import ApiFetch from '../utils/ApiFetch'
import config from 'config'
import { debounce }  from 'lodash'


const usernameAvailability = (values/*, dispatch*/) => {
  const options = {
    method: 'GET'
  }

  return ApiFetch(`${config.api}/api/usernames/${values.username}`, options)
  .then(result => {
    if(result.isUsernameReserved)
      throw { username: 'Username is taken!' }
  })

}

export default usernameAvailability