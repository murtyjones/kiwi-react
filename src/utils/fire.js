import firebase from 'firebase'
import config from 'config'

let fire = null
try {
  fire = firebase.initializeApp(config.firebase)
} catch (err) {

}
export default fire