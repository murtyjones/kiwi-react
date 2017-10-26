import history from '../history'
import auth0 from 'auth0-js'
import config from 'config'


export default class AuthServiceV2 {
  auth0 = new auth0.WebAuth({
    domain: 'kiwi-prod.auth0.com',
    clientID: 'qNZS0jbIQwLus56P2h2T2PbzuwIf6EaF',
    redirectUri: `${config.host}/auth/callback`,
    audience: `https://kiwi-prod.auth0.com/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  })


  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/home')
      } else if (err) {
        history.replace('/home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the home route
    history.replace('/home')
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    history.replace('/home')
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt

  }
}