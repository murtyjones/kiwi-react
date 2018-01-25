import userProjectsReducer from '../../../../src/reducers/UserProjects'
import { ACTIONS } from '../../../../src/constants'


describe('UserProjects Reducer', () => {

  describe('...REQUEST', () => {
    describe('PUT_USER_PROJECT_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
            key: 'value'
        }
        action = {
          type: ACTIONS.PUT_USER_PROJECT_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

    })

    describe('POST_USER_PROJECT_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.POST_USER_PROJECT_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })


    })

    describe('GET_MANY_USER_PROJECTS_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.GET_MANY_USER_PROJECTS_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })
    })

    describe('GET_USER_PROJECT_REQUEST', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.GET_USER_PROJECT_REQUEST
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: true
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })
    })
  })


  describe('...SUCCESS', () => {

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
          , isFetching: false
        }
        action = {
          type: ACTIONS.PUT_USER_PROJECT_SUCCESS
          , payload: {
            before: {}
            , after: {_id: '123'}
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        expectedState.userProjectsById[action.payload.after._id] = action.payload.after
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.GET_USER_PROJECT_SUCCESS
          , payload: {_id: '1', key: 'value'}
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        expectedState.userProjectsById[action.payload._id] = action.payload
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.POST_USER_PROJECT_SUCCESS
          , payload: {_id: '1', key: 'value'}
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        expectedState.userProjectsById[action.payload._id] = action.payload
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
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
          , isFetching: false
        }
        action = {
          type: ACTIONS.GET_MANY_USER_PROJECTS_SUCCESS
          , payload: [
            {_id: '1', key: 'value'}
            , {_id: '2', key: 'value'}
            , {_id: '3', key: 'value'}
          ]
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
        }
        action.payload.forEach(e => {
          expectedState.userProjectsById[e._id] = e
        })
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

    })

  })


  describe('...FAILURE', () => {
    describe('PUT_USER_PROJECT_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.PUT_USER_PROJECT_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })

    })

    describe('POST_USER_PROJECT_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.POST_USER_PROJECT_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })


    })

    describe('GET_MANY_USER_PROJECTS_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.GET_MANY_USER_PROJECTS_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })
    })

    describe('GET_USER_PROJECT_FAILURE', () => {
      let initialState, action
      beforeEach(() => {
        initialState = {
          key: 'value'
        }
        action = {
          type: ACTIONS.GET_USER_PROJECT_FAILURE
          , payload: {
            before: {}
            , after: { _id: '123' }
          }
        }
      })

      it('should modify state as expected', () => {
        const expectedState = {
          ...initialState
          , isFetching: false
        }
        const newState = userProjectsReducer(initialState, action)
        expect(newState).toEqual(expectedState)
      })
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
        , isFetching: false
      }
      const newState = userProjectsReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })
  })


})