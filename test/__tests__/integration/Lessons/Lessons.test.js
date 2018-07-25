import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import config from 'config'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Route from 'react-router-dom/Route'
import MemoryRouter from 'react-router-dom/MemoryRouter'

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
    describe('with #1 - #2 completed, #3 in progress, #4 not started', () => {
      beforeEach(async () => {
        setupStore()
        ApiFetch.mockImplementationOnce(() => Promise.resolve(lessons)) // getManyLessons response
        ApiFetch.mockImplementationOnce(() => Promise.resolve(userLessons)) // getManyUserLessons response
        ApiFetch.mockImplementationOnce(() => Promise.resolve(lessonOrder)) // getLessonOrder response
        ApiFetch.mockImplementationOnce(() => Promise.resolve({})) // getProfileDetails response
        component = mountWithStore(props, store) // mount component
        await flushAllPromises() // wait for requests to resolve
        component.update() // update component after having resolved requests
      })

      afterEach(() => {
        ApiFetch.mockReset()
      })

      describe('UNSAFE_componentWillMount', () => {
        it('should dispatch the appropriate requests', () => {
          expect(dispatchSpy).toBeCalledWith({type: ACTIONS.GET_MANY_LESSONS_REQUEST})
          expect(dispatchSpy).toBeCalledWith({type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST})
          expect(dispatchSpy).toBeCalledWith({type: ACTIONS.GET_LESSON_ORDER_REQUEST})
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
          expect(ApiFetch.mock.calls[0][0]).toBe(`${config.api}/lessons`)
          expect(ApiFetch.mock.calls[0][1]).toEqual({method: 'GET'})
          expect(ApiFetch.mock.calls[1][0]).toBe(`${config.api}/user-lessons?userId=${chesterAdminUserId}`)
          expect(ApiFetch.mock.calls[1][1]).toEqual({method: 'GET'})
          expect(ApiFetch.mock.calls[2][0]).toBe(`${config.api}/lesson-order`)
          expect(ApiFetch.mock.calls[2][1]).toEqual({method: 'GET'})
        })

      })

      describe('render and interact', () => {
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

        it('should render a bubble with generic elements for all 4 lessons', async () => {
          const bubbleContainers = component.find('div[className="map-bubble-container"]')
          const bubbles = component.find('div[className="map-bubble"]')
          expect(bubbleContainers.length).toEqual(lessons.length)
          expect(bubbles.length).toEqual(lessons.length)

          expect(component.find('button[className="map-bubble-button"]'))

        })

        it('should render a pulse for the one active lesson', async () => {
          const elements = component.find('button[className="map-bubble-button hvr-pulse-inverse"]')

          expect(elements.length).toEqual(1)
        })

        it('should render 3 lesson progresses with clickable for the three active lessons', async () => {
          const elements = component.find('div[className="lesson-progress clickable"]')

          expect(elements.length).toEqual(3)
        })

        it('should render 2 checks for the completed lessons', async () => {
          const elements = component.find('Check')

          expect(elements.length).toEqual(2)
        })

        it('should render 1 lock for the locked lesson', async () => {
          const elements = component.find('Lock')

          expect(elements.length).toEqual(1)
        })

        it('should generate LessonCard if lesson 2 clicked', async () => {
          // before action
          expect(component.find('LessonCard').length).toEqual(0)
          expect(component.find(`KiwiLink[to="/lessons/${lesson2._id}"]`).length).toEqual(0)
          expect(component.find('Card[className="map-card"]').length).toEqual(0)
          expect(component.find('CardMedia').length).toEqual(0)
          expect(component.find('CardHeader').length).toEqual(0)
          expect(component.find('span[className="map-card-title"]').length).toEqual(0)
          expect(component.find('span[className="map-card-subtitle"]').length).toEqual(0)
          expect(component.find('TimeToComplete').length).toEqual(0)
          expect(component.find('GoButton').length).toEqual(0)

          // action
          const element = component.find('button[className="map-bubble-button"]').at(1)
          element.simulate('click')
          // after action
          expect(component.find('LessonCard').length).toEqual(1)
          expect(component.find('LessonCard').props().lesson).toEqual({
            ...lesson2, order: 2, userLesson: userLesson2
          })
          expect(component.find(`KiwiLink[to="/lessons/${lesson2._id}"]`).length).toEqual(1)
          expect(component.find('Card[className="map-card"]').length).toEqual(1)
          expect(component.find('CardMedia').length).toEqual(1)
          expect(component.find('CardHeader').length).toEqual(1)
          expect(component.find('span[className="map-card-title"]').length).toEqual(1)
          expect(component.find('span[className="map-card-subtitle"]').length).toEqual(1)
          expect(component.find('TimeToComplete').length).toEqual(1)
          expect(component.find('GoButton').length).toEqual(1)
        })

        it('should generate LessonCard if lesson 3 clicked', async () => {
          // before action
          expect(component.find('LessonCard').length).toEqual(0)
          expect(component.find(`KiwiLink[to="/lessons/${lesson3._id}"]`).length).toEqual(0)
          expect(component.find('Card[className="map-card"]').length).toEqual(0)
          expect(component.find('CardMedia').length).toEqual(0)
          expect(component.find('CardHeader').length).toEqual(0)
          expect(component.find('span[className="map-card-title"]').length).toEqual(0)
          expect(component.find('span[className="map-card-subtitle"]').length).toEqual(0)
          expect(component.find('TimeToComplete').length).toEqual(0)
          expect(component.find('GoButton').length).toEqual(0)

          // action
          const element = component.find('button[className="map-bubble-button hvr-pulse-inverse"]')
          element.simulate('click')

          // after action
          expect(component.find('LessonCard').length).toEqual(1)
          expect(component.find('LessonCard').props().lesson).toEqual({
            ...lesson3,
            order: 3,
            userLesson: userLesson3
          })
          expect(component.find(`KiwiLink[to="/lessons/${lesson3._id}"]`).length).toEqual(1)
          expect(component.find('Card[className="map-card"]').length).toEqual(1)
          expect(component.find('CardMedia').length).toEqual(1)
          expect(component.find('CardHeader').length).toEqual(1)
          expect(component.find('span[className="map-card-title"]').length).toEqual(1)
          expect(component.find('span[className="map-card-subtitle"]').length).toEqual(1)
          expect(component.find('TimeToComplete').length).toEqual(1)
          expect(component.find('GoButton').length).toEqual(1)
        })

        it('should NOT generate LessonCard if lesson 4 clicked', async () => {
          let LessonCard = component.find('LessonCard')
          expect(LessonCard.length).toEqual(0)
          const element = component.find('button[className="map-bubble-button"]').at(2)
          element.simulate('click')
          LessonCard = component.find('LessonCard')
          expect(LessonCard.length).toEqual(0)
          expect(component.find('LessonCard').length).toEqual(0)
          expect(component.find(`KiwiLink[to="/lessons/${lesson4._id}"]`).length).toEqual(0)
          expect(component.find('Card[className="map-card"]').length).toEqual(0)
          expect(component.find('CardMedia').length).toEqual(0)
          expect(component.find('CardHeader').length).toEqual(0)
          expect(component.find('span[className="map-card-title"]').length).toEqual(0)
          expect(component.find('span[className="map-card-subtitle"]').length).toEqual(0)
          expect(component.find('TimeToComplete').length).toEqual(0)
          expect(component.find('GoButton').length).toEqual(0)
        })

      })
    })

    describe('with no lessons or lesson order', () => {
      beforeEach(async () => {
        lessons = []
        lessonOrder = { order: [ ] }
        setupStore()
        ApiFetch.mockImplementationOnce(() => Promise.resolve([])) // getManyLessons response
        ApiFetch.mockImplementationOnce(() => Promise.resolve(userLessons)) // getManyUserLessons response
        ApiFetch.mockImplementationOnce(() => Promise.resolve(lessonOrder)) // getLessonOrder response
        ApiFetch.mockImplementationOnce(() => Promise.resolve({})) // getProfileDetails response
        component = mountWithStore(props, store) // mount component
        await flushAllPromises() // wait for requests to resolve
        component.update() // update component after having resolved requests
      })

      it('should render 0 lessons bubbles', async () => {
        const bubbleContainers = component.find('div[className="map-bubble-container"]')
        const bubbles = component.find('div[className="map-bubble"]')
        expect(bubbleContainers.length).toEqual(0)
        expect(bubbles.length).toEqual(0)
      })
    })

  })
})