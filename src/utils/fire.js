import firebase from 'firebase'
import Config from 'config'

let fire = null
try {
  fire = firebase.initializeApp(Config.firebase)
} catch (err) {

}
export default fire