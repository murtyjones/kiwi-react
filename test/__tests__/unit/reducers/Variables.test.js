import variablesReducer from '../../../../src/reducers/Variables'
import { ACTIONS } from '../../../../src/constants'


describe('Variables Reducer', () => {
  describe('PUT_VARIABLE_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        variablesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.PUT_VARIABLE_SUCCESS
        , payload: {
          before: {}
          , after: { _id: '123' }
        }
      }
    })

    it('should modify variablesById as expected', () => {
      const expectedState = {
        ...initialState
      }
      expectedState.variablesById[action.payload.after._id] = action.payload.after
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })

  })

  describe('GET_VARIABLE_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        variablesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.GET_VARIABLE_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify variablesById as expected', () => {
      const expectedState = {
        ...initialState
      }
      expectedState.variablesById[action.payload._id] = action.payload
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })

  })

  describe('POST_VARIABLE_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        variablesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.POST_VARIABLE_SUCCESS
        , payload: { _id: '1', key: 'value' }
      }
    })

    it('should modify variablesById as expected', () => {
      const expectedState = {
        ...initialState
      }
      expectedState.variablesById[action.payload._id] = action.payload
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })

  })

  describe('GET_MANY_VARIABLES_SUCCESS', () => {
    let initialState, action
    beforeEach(() => {
      initialState = {
        variablesById: {
          'shouldSurvive': {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.GET_MANY_VARIABLES_SUCCESS
        , payload: [
          { _id: '1', key: 'value' }
          , { _id: '2', key: 'value' }
          , { _id: '3', key: 'value' }
        ]
      }
    })

    it('should modify variablesById as expected', () => {
      const expectedState = {
        ...initialState
      }
      action.payload.forEach(e => { expectedState.variablesById[e._id] = e })
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })

  })

  describe('DELETE_VARIABLE_SUCCESS', () => {
    let initialState, action, variableId
    beforeEach(() => {
      variableId = 'id1'
      initialState = {
        variablesById: {
          [variableId]: {
            key: 'value'
          }
          , shouldNotSurvive: {
            key: 'value'
          }
        }
        , otherStuff: {
          key: 'value'
        }
      }
      action = {
        type: ACTIONS.DELETE_VARIABLE_SUCCESS
        , payload: {
          ok: 1
          , value: { _id: variableId }
        }
      }
    })

    it('should modify state as expected if ok returned', () => {
      const expectedState = {
        ...initialState
      }
      delete expectedState.variablesById[variableId]
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })

    it('should not modify variablesById at all if !ok', () => {
      action.payload.ok = 0
      const expectedState = {
        ...initialState
      }
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
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
        variablesById: {}
      }
      const newState = variablesReducer(initialState, action)
      expect(newState).toEqual(expectedState)
    })
  })

})