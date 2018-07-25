const testEnv = require('../../config/test.json')

jest.doMock('config', () => testEnv)