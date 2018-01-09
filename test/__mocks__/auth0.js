export const loginStubResult = 'loginStub result'
export const loginStub = jest.fn((params, cb) => cb(null, loginStubResult))

export default {
  WebAuth: jest.fn(() => {
    return {
      client: {
        login: loginStub
      }
    }
  })
}