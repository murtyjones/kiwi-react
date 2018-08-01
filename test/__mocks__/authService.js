const methods = {
  decodeToken: jest.fn((idToken) => { return 'decodeToken response' })
  , decodedExp: jest.fn((idToken) => { return 'decodedExp response' })
  , setToken: jest.fn((idToken) => { return 'setToken response' })
  , setTokenExp: jest.fn((decodedExp) => { return 'setTokenExp response' })
  , setIsAdmin: jest.fn((decoded) => { return 'setIsAdmin response' })
  , setIsProvider: jest.fn((decoded) => { return 'setIsProvider response' })
  , setSubscription: jest.fn((decoded) => { return 'setSubscription response' })
  , setUserId: jest.fn((decoded) => { return 'setUserId response' })
  , setUsername: jest.fn((decoded) => { return 'setUsername response' })
  , getUsername: jest.fn((decoded) => { return 'getUsername response' })
  , setRefreshToken: jest.fn((refreshToken) => { return 'setRefreshToken response' })
  , setTemporaryPassword: jest.fn((decoded) => { return 'setTemporaryPassword response' })
  , getToken: jest.fn(() => { return 'getToken response' })
  , getTokenExp: jest.fn(() => { return 'getTokenExp response' })
  , getIsAdmin: jest.fn(() => { return 'getIsAdmin response' })
  , getIsProvider: jest.fn(() => { return 'getIsProvider response' })
  , getSubscription: jest.fn(() => { return 'getSubscription response' })
  , getTemporaryPassword: jest.fn(() => { return 'getTemporaryPassword response' })
  , getTokenIat: jest.fn(() => { return 'getTokenIat response' })
  , setTokenIat: jest.fn(() => { return 'setTokenIat response' })
  , getUserId: jest.fn(() => { return 'getUserId response' })
  , getRefreshToken: jest.fn(() => { return 'getRefreshToken response' })
  , isAuthenticated: jest.fn(() => { return true })
  , decodeTokenExp: jest.fn((decodedExp) => { return 'decodeTokenExp response' })
  , login: jest.fn((params) => Promise.resolve('login response'))
  , signout: jest.fn((params) => Promise.resolve('signout response'))
}

export default methods

class mockAuthService {
  constructor() {
    Object.keys(methods).forEach(key => this[key] = methods[key])
  }
}

export { mockAuthService }
