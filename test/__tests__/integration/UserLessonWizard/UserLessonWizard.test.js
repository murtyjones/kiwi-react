import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import { ACTIONS, LESSON_SLIDE_TYPES } from '../../../../src/constants'
import { notCombined } from '../../../../src/reducers/index'
import UserLessonWizard from '../../../../src/UserLessonWizard/UserLessonWizard'
import { setupIntegrationTest } from '../../../intSetup'

jest.mock('../../../../src/utils/ApiFetch')
import ApiFetch from '../../../../src/utils/ApiFetch'
import '../../../__mocks__/codeMirrorDom'


describe('integration tests', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , getLessonPayload = { body: 111 }
    , getManyUserLessonsPayload = [{ body: 222 }]
    , postLessonPayload = { _id: '123', slides: [] }
    , lessonId = 'fakeId'
    , router = {}
    , props = {}
    , store
    , dispatchSpy
    , mountComponent
    , preMount
    , component
    , lesson = {
      "_id" : lessonId,
      "isPublished" : true,
      "title" : "Print Statements!",
      "subtitle" : "How to show an output",
      "minutesToComplete" : 15,
      "slides" : [
        {
          "type" : LESSON_SLIDE_TYPES.FULL_PAGE_TEXT,
          "instructions" : "<p>slide1Instructions</p>",
          "editorInput" : "slide1EditorInput",
          "title" : "What is a Print Statement? ",
          "id" : "075866a6-7b18-4a6d-86c7-e4f5503e40af"
        },
        {
          "type" : LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR,
          "prompt" : "slide2Prompt",
          "editorInput" : "slide2EditorInput",
          "id" : "6f1a9e61-6fcf-4fec-96ba-558912478786"
        },
        {
          "type": LESSON_SLIDE_TYPES.HALF_HALF,
          "instructions": "<p>slide3Instructions</p>",
          "editorInput": "slide3EditorInput",
          "id": "76915074-79eb-423c-b754-5151f099d947"
        }
      ],
      "updatedAt" : "2017-12-08T04:40:08Z"
    }

  beforeEach(() => {
    preMount = () => {
      ({ store, dispatchSpy } = setupIntegrationTest(notCombined, router))
      store.dispatch({ payload: { idToken: chesterAdminIdToken }, type: ACTIONS.LOGIN_SUCCESS })
    }
    mountComponent = (childProps, store) => {
      return mount(
        <MemoryRouter initialEntries={[ '/lessons/fakeId' ]}>
          <Provider store={ store }>
            <Route
              component={ matchProps => <UserLessonWizard { ...childProps } { ...matchProps } />}
              path="/lessons/:id" />

          </Provider>
        </MemoryRouter>
        , {
          context: {
            muiTheme: getMuiTheme()
            , match: { params: { id: lessonId } }
          },
          childContextTypes: {
            muiTheme: PropTypes.object.isRequired
            , match: PropTypes.object.isRequired
          }
        })
    }

  })

  afterEach(() => {
    ApiFetch.mockClear()
  })


  describe('componentWillMount', () => {

    describe('when needsLesson', () => {
      beforeEach(() => {
        preMount()
        ApiFetch.mockImplementationOnce(() => Promise.resolve(getLessonPayload))
        ApiFetch.mockImplementationOnce(() => Promise.resolve(getManyUserLessonsPayload))
        component = mountComponent(props, store)
      })

      afterEach(() => {
        ApiFetch.mockReset()
      })

      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_SUCCESS, payload: getLessonPayload })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: getManyUserLessonsPayload })
      })

      it('should pass the lessonId and userId when making requests', () => {
        expect(ApiFetch.mock.calls[0][0]).toBe(`http://localhost:8080/api/lessons/${lessonId}`)
        expect(ApiFetch.mock.calls[1][0]).toBe(`http://localhost:8080/api/userlessons?lessonId=${lessonId}&userId=${chesterAdminUserId}`)
      })
    })

    describe('when !needsLesson', () => {
      beforeEach(() => {
        preMount()
        ApiFetch.mockImplementationOnce(() => Promise.resolve(getLessonPayload))
        ApiFetch.mockImplementationOnce(() => Promise.resolve(getManyUserLessonsPayload))
        store.dispatch({ payload: lesson, type: ACTIONS.GET_LESSON_SUCCESS })
        component = mountComponent(props, store)
      })

      afterEach(() => {
        ApiFetch.mockReset()
      })

      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_LESSON_REQUEST })
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_LESSON_SUCCESS, payload: getLessonPayload })
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: getManyUserLessonsPayload })
      })

      it('should not call ApiFetch', () => {
        expect(ApiFetch.mock.calls.length).toBe(0)
      })

    })

  })


  describe('initial render', () => { // enzyme can't handle arrays yet so testing will need to be done the buttons and such
    beforeEach(() => {
      preMount()
      store.dispatch({ payload: lesson, type: ACTIONS.GET_LESSON_SUCCESS })
      component = mountComponent(props, store)
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    it('should render two svgs for forward and back buttons', () => {
      expect(component.find('svg').length).toBe(2)
    })

    it('should not dispatch post or put requests when initially render', () => {
      expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.POST_USER_LESSON_REQUEST })
      expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.PUT_USER_LESSON_REQUEST })
    })

    it('should render the form', () => {
      expect(component.find('form[className="lessonWizardForm"]').length).toBe(1)
    })

    it('should render the form content div', () => {
      expect(component.find('div[className="lessonWizardFormContent"]').length).toBe(1)
    })

    it('should render slide title', () => {
      expect(component.find('div[id="title"]').length).toBe(1)
    })

    it('should render first slide instructions', () => {
      expect(component.find('div[id="instructions"]').length).toBe(1)
      expect(component.find('div[id="instructions"]').props()).toHaveProperty('dangerouslySetInnerHTML', {__html: lesson.slides[0].instructions})
    })

  })


  describe('after clicking next once', () => {
    beforeEach(() => {
      preMount()
      // ApiFetch.mockImplementationOnce(() => Promise.resolve(getLessonPayload))
      // ApiFetch.mockImplementationOnce(() => Promise.resolve(getManyUserLessonsPayload))
      ApiFetch.mockImplementationOnce(() => Promise.resolve(postLessonPayload))
      store.dispatch({ payload: lesson, type: ACTIONS.GET_LESSON_SUCCESS })
      component = mountComponent(props, store)
      component.find('svg').at(1).simulate('click')
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    it('should ', () => {
      expect(ApiFetch.mock.calls.length).toBe(1)
      expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.POST_USER_LESSON_REQUEST })
      expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.POST_USER_LESSON_SUCCESS, payload: postLessonPayload })
    })

  })





})