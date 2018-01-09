jest.mock('config', () => {
  return {
    auth: {
      domain: "fakeDomain",
      clientID: "fakeClientId",
      redirectUri: "fakeRedirectUri",
      audience: "fakeAudience",
      responseType: "fakeResponseType",
      scope: "fakeScope",
      namespace: "fakeNamespace",
      realm: "fakeRealm"
    },
    api: 'http://fakeApiUrl.com',
    host : "http://fakeHostUrl.com"
  }
})