import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import { ACTIONS, LESSON_SLIDE_TYPES } from '../../../../src/constants'
import { notCombined } from '../../../../src/reducers/index'
import Lessons from '../../../../src/Lessons/Lessons'
import { setupIntegrationTest } from '../../../integrationSetup'

import ApiFetch from '../../../../src/utils/ApiFetch'

export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('Lessons', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , lesson1, lesson2, lesson3, lesson4
    , userLesson1, userLesson2, userLesson3
    , themeId1, themeId2
    , lessons
    , userLessons
    , manyLessonThemes
    , lessonOrder
    , router = {}
    , props = {}
    , store
    , dispatchSpy
    , mountWithStore
    , setupStore
    , component

  beforeEach(() => {
    themeId1 = 'themeId1'; themeId2 = 'themeId2'
    lesson1 = {
      _id: 'lesson1'
      , isPublished: true
      , title: 'lesson1Title'
      , subtitle: 'lesson1Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
      , themeId: themeId1
    }
    lesson2 = {
      _id: 'lesson2'
      , isPublished: true
      , title: 'lesson2Title'
      , subtitle: 'lesson2Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
      , themeId: themeId1
    }
    lesson3 = {
      _id: 'lesson3'
      , isPublished: true
      , title: 'lesson3Title'
      , subtitle: 'lesson3Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
      , themeId: themeId2
    }
    lesson4 = {
      _id: 'lesson4'
      , isPublished: true
      , title: 'lesson4Title'
      , subtitle: 'lesson4Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
      , themeId: themeId2
    }
    lessons = [ lesson1, lesson2, lesson3, lesson4 ]
    userLesson1 = {
      _id: 'userLesson1'
      , lessonId: lesson1._id
      , hasBeenCompleted: true
    }
    userLesson2 = {
      _id: 'userLesson2'
      , lessonId: lesson2._id
      , hasBeenCompleted: true
    }
    userLesson3 = {
      _id: 'userLesson3',
      lessonId: lesson3._id
    }
    userLessons = [ userLesson1, userLesson2, userLesson3 ]
    lessonOrder = { order: [ lesson1._id, lesson2._id, lesson3._id, lesson4._id ] }
    manyLessonThemes = [ { _id: themeId1 }, { _id: themeId2 } ]
    setupStore = () => {
      ({store, dispatchSpy} = setupIntegrationTest(notCombined, router))
      store.dispatch({
        payload: {idToken: chesterAdminIdToken},
        type: ACTIONS.LOGIN_SUCCESS
      })
    }
    mountWithStore = (childProps, store) => {
      return mount(
        <MemoryRouter initialEntries={[`/lessons`]}>
          <Provider store={store}>
            <Route
              component={matchProps =>
                <Lessons {...childProps} {...matchProps} />
              }
              path="/lessons"
            />
          </Provider>
        </MemoryRouter>
        , {
          context: {
            muiTheme: getMuiTheme()
            , match: {}
          },
          childContextTypes: {
            muiTheme: PropTypes.object.isRequired
            , match: PropTypes.object.isRequired
          }
        })
    }

  })


  describe('with no starting lessons, userLessons, or orders', () => {
    beforeEach(async () => {
      setupStore()
      ApiFetch.mockImplementationOnce(() => Promise.resolve(lessons)) // getManyLessons response
      ApiFetch.mockImplementationOnce(() => Promise.resolve(userLessons)) // getManyUserLessons response
      ApiFetch.mockImplementationOnce(() => Promise.resolve(lessonOrder)) // getLessonOrder response
      ApiFetch.mockImplementationOnce(() => Promise.resolve(manyLessonThemes)) // getManyLessonThemes response
      component = mountWithStore(props, store) // mount component
      await flushAllPromises() // wait for requests to resolve
      component.update() // update component after having resolved requests
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    describe('componentWillMount', () => {
      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_LESSONS_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_ORDER_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).toBeCalledWith({
          type: ACTIONS.GET_MANY_LESSONS_SUCCESS,
          payload: lessons
        })
        expect(dispatchSpy).toBeCalledWith({
          type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS,
          payload: userLessons
        })
        expect(dispatchSpy).toBeCalledWith({
          type: ACTIONS.GET_LESSON_ORDER_SUCCESS,
          payload: lessonOrder
        })
      })

      it('should call ApiFetch with expected params', () => {
        expect(ApiFetch.mock.calls[0][0]).toBe(`http://localhost:8080/api/lessons`)
        expect(ApiFetch.mock.calls[0][1]).toEqual({ method: "GET" })
        expect(ApiFetch.mock.calls[1][0]).toBe(`http://localhost:8080/api/userlessons?userId=${chesterAdminUserId}`)
        expect(ApiFetch.mock.calls[1][1]).toEqual({ method: "GET" })
        expect(ApiFetch.mock.calls[2][0]).toBe(`http://localhost:8080/api/lessons/order`)
        expect(ApiFetch.mock.calls[2][1]).toEqual({ method: "GET" })
      })

    })

    describe('render', () => {
      it('should pass expected combinedMapLessons to LessonMap', async () => {
        const expectedMapLessons = [
          {
            ...lesson1
            , userLesson: userLesson1
          },
          {
            ...lesson2
            , userLesson: userLesson2
          },
          {
            ...lesson3
            , userLesson: userLesson3
          },
          {
            ...lesson4
            , userLesson: {}
          }
        ]
        // there are multiple nodes because of cloneElement
        const instanceComponents = component.find('LessonMap')
        expect(instanceComponents.at(0).props().mapLessons).toEqual(expectedMapLessons)
      })

    })

  })
})