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

jest.mock('react-konva', () => {
  return {
    Stage: (props) => <div>{props.children}</div>
    , Layer: (props) => <div>{props.children}</div>
    , Circle: (props) => <div>{props.children}</div>
    , Text: (props) => <div>{props.children}</div>
    , Path: (props) => <div>{props.children}</div>
    , Arc: (props) => <div>{props.children}</div>
    , Line: (props) => <div>{props.children}</div>
    , Rect: (props) => <div>{props.children}</div>
    , Label: (props) => <div>{props.children}</div>
    , Tag: (props) => <div>{props.children}</div>
  }
})

export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('Lessons', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , lesson1, lesson2, lesson3, lesson4
    , userLesson1, userLesson2, userLesson3
    , lessons
    , userLessons
    , lessonOrder
    , router = {}
    , props = {}
    , store
    , dispatchSpy
    , mountWithStore
    , setupStore
    , component

  beforeEach(() => {
    lesson1 = {
      _id: 'lesson1'
      , isPublished: true
      , title: 'lesson1Title'
      , subtitle: 'lesson1Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
    }
    lesson2 = {
      _id: 'lesson2'
      , isPublished: true
      , title: 'lesson2Title'
      , subtitle: 'lesson2Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
    }
    lesson3 = {
      _id: 'lesson3'
      , isPublished: true
      , title: 'lesson3Title'
      , subtitle: 'lesson3Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
    }
    lesson4 = {
      _id: 'lesson4'
      , isPublished: true
      , title: 'lesson4Title'
      , subtitle: 'lesson4Subtitle'
      , minutesToComplete: 15
      , slides: []
      , updatedAt: "2017-12-08T04:40:08Z"
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
      component = mountWithStore(props, store) // mount component
      await flushAllPromises() // wait for requests to resolve
      component.update() // update component after having resolved requests
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    describe('componentWillMount', () => {
      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.CLOSE_SIDENAV })
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
      it('should pass expected mapLessons to LessonMap', async () => {
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
          lesson4
        ]
        expect(component.find('LessonMap').props().mapLessons).toEqual(expectedMapLessons)
      })

      it('should render a Label with Tag and Text children for each lesson', async () => {
        const labels = component.find('Label')
        expect(labels.length).toEqual(lessons.length)
        labels.forEach(e => {
          expect(e.childAt(0).find('Tag').length).toBe(1)
          expect(e.childAt(0).find('Text').length).toBe(1)
        })
      })

      it('should render two Circles for each lesson', async () => {
        expect(component.find(`Circle`).length).toBe(lessons.length * 2)
      })

      it('should render one Text element with the order as content for each lesson that is available', async () => {
        expect(component.find(`Text[text=${1}]`).length).toBe(1)
        expect(component.find(`Text[text=${2}]`).length).toBe(1)
        expect(component.find(`Text[text=${3}]`).length).toBe(1)
        expect(component.find(`Text[text=${4}]`).length).toBe(0)
      })

      it('should render two Arcs for each lesson', async () => {
        expect(component.find(`Arc`).length).toBe(lessons.length * 2)
      })

      it('should render one Line for the two completed lessons', async () => {
        expect(component.find(`Line`).length).toBe(2)
      })

      it('should render one Path (lock icon) for the one locked lesson', async () => {
        expect(component.find(`Path`).length).toBe(1)
      })

    })

  })
})