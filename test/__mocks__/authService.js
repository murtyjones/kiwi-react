const methods = {
  decodeToken: jest.fn((idToken) => { return 'decodeToken response' })
  , decodedExp: jest.fn((idToken) => { return 'decodedExp response' })
  , setToken: jest.fn((idToken) => { return 'setToken response' })
  , setTokenExp: jest.fn((decodedExp) => { return 'setTokenExp response' })
  , setIsAdmin: jest.fn((decoded) => { return 'setIsAdmin response' })
  , setUserId: jest.fn((decoded) => { return 'setUserId response' })
  , setRefreshToken: jest.fn((refreshToken) => { return 'setRefreshToken response' })
  , getToken: jest.fn(() => { return 'getToken response' })
  , getTokenExp: jest.fn(() => { return 'getTokenExp response' })
  , getIsAdmin: jest.fn(() => { return 'getIsAdmin response' })
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