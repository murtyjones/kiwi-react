import userProjectsReducer from '../../../../src/reducers/UserProjects'
import { ACTIONS } from '../../../../src/constants'


describe('UserProjects Reducer', () => {
  describe('PUT_USER_PROJECT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        userProjectsById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.PUT_USER_PROJECT_SUCCESS
        , payload: {
          before: {}
          , after: { _id: '123' }
        }
      }
    })

    it('should modify userProjectsById as expected', () => {
      const expectedUserProjectsById = {
        ...initialState.userProjectsById
        , [action.payload.after._id]: action.payload.after
      }
      const r = userProjectsReducer(initialState, action)
      expect(r.userProjectsById).toEqual(expectedUserProjectsById)
    })

    it('should not modify the rest of state', () => {
      const r = userProjectsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })
  })

  describe('GET_USER_PROJECT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        userProjectsById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.GET_USER_PROJECT_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify userProjectsById as expected', () => {
      const expectedUserProjectsById = {
        ...initialState.userProjectsById
        , [action.payload._id]: action.payload
      }
      const r = userProjectsReducer(initialState, action)
      expect(r.userProjectsById).toEqual(expectedUserProjectsById)
    })

    it('should not modify the rest of state', () => {
      const r = userProjectsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })

  })

  describe('POST_USER_PROJECT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        userProjectsById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.POST_USER_PROJECT_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify userProjectsById as expected', () => {
      const expectedUserProjectsById = {
        ...initialState.userProjectsById
        , [action.payload._id]: action.payload
      }
      const r = userProjectsReducer(initialState, action)
      expect(r.userProjectsById).toEqual(expectedUserProjectsById)
    })

    it('should not modify the rest of state', () => {
      const r = userProjectsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })

  })

  describe('GET_MANY_USER_PROJECTS_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        userProjectsById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS
        , payload: [
          { _id: '1', key: 'value' }
          , { _id: '2', key: 'value' }
          , { _id: '3', key: 'value' }
        ]
      }
    })

    it('should modify userProjectsById as expected', () => {
      const expectedUserProjectsById = {
        ...initialState.userProjectsById
      }
      action.payload.forEach(e => { expectedUserProjectsById[e._id] = e })
      const r = userProjectsReducer(initialState, action)
      expect(r.userProjectsById).toEqual(expectedUserProjectsById)
    })

    it('should not modify the rest of state', () => {
      const r = userProjectsReducer(initialState, action)
      expect(r.otherStuff).toEqual(initialState.otherStuff)
    })
  })

  describe('SIGNOUT_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {}
      action = {
        type: ACTIONS.SIGNOUT_SUCCESS
      }
    })

    it('should modify state as expected', () => {
      const expectedState = {
        userProjectsById: {}
      }
      const r = userProjectsReducer(initialState, action)
      expect(r).toEqual(expectedState)
    })
  })

})