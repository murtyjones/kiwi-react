jest.mock('config', () => {
  return {
    api: 'http://fakeUrl.com'
  }
})