import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import { ACTIONS, LESSON_SLIDE_TYPES } from '../../../../src/constants'
import { notCombined } from '../../../../src/reducers/index'
import UserProject from '../../../../src/UserProject/UserProject'
import { setupIntegrationTest } from '../../../integrationSetup'

import ApiFetch from '../../../../src/utils/ApiFetch'
import '../../../__mocks__/codeMirrorDom'

export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('UserProject', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , userProjectId
    , userLessonId
    , slide2Id, slide3Id, slide4Id, slide1Id
    , lesson
    , userLesson
    , router = {}
    , props = {}
    , store
    , dispatchSpy
    , mountWithStore
    , setupStore
    , component

  beforeEach(() => {
    slide1Id = 'id1'
    slide2Id = 'id2'
    slide3Id = 'id3'
    slide4Id = 'id4'
    userProjectId = 'fakeLessonId'
    userLessonId = 'fakeUserLessonId'
    lesson = {
      _id: userProjectId
      , isPublished: true
      , title: "Print Statements!"
      , subtitle: "How to show an output"
      , minutesToComplete: 15
      , slides: [
        {
          type: LESSON_SLIDE_TYPES.TITLE
          , title: "slide1Title"
          , subtitle: "slide1Subtitle"
          , description: "slide1Description"
          , id: slide1Id
        },
        {
          type: LESSON_SLIDE_TYPES.FULL_PAGE_TEXT
          , instructions: "<p>slide1Instructions</p>"
          , editorInput: "slide2EditorInput"
          , title: "What is a Print Statement? "
          , id: slide2Id
        },
        {
          type: LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR
          , prompt: "slide3Prompt"
          , editorInput: "slide2EditorInput"
          , id: slide3Id
        },
        {
          type: LESSON_SLIDE_TYPES.HALF_HALF
          , instructions: "<p>slide4Instructions</p>"
          , editorInput: "slide4EditorInput"
          , id: slide4Id
        }
      ],
      updatedAt: "2017-12-08T04:40:08Z"
    }
    userLesson = {
      _id: userLessonId,
      userProjectId,
      answerData: {
        [slide2Id]: {  }
        , [slide1Id]: { answer: "" }
        , [slide2Id]: { answer: "" }
        , [slide3Id]: { answer: "slide3Answer" }
        , [slide4Id]: { answer: "" }
      }
    }
    setupStore = () => {
      ({ store, dispatchSpy } = setupIntegrationTest(notCombined, router))
      store.dispatch({ payload: { idToken: chesterAdminIdToken }, type: ACTIONS.LOGIN_SUCCESS })
    }
  })

  describe('with new userProject', () => {
    beforeEach(async() => {
      mountWithStore = (childProps, store) => {
        return mount(
          <MemoryRouter initialEntries={[`/projects/new`]}>
            <Provider store={store}>
              <Route
                component={ matchProps =>
                  <UserProject {...childProps} {...matchProps} />
                }
                path="/projects/new"
              />
            </Provider>
          </MemoryRouter>
          , {
            context: {
              muiTheme: getMuiTheme()
              , match: { params:  { } }
            },
            childContextTypes: {
              muiTheme: PropTypes.object.isRequired
              , match: PropTypes.object.isRequired
            }
          })
      }
      setupStore()
      ApiFetch.mockImplementationOnce(() => Promise.resolve({})) // getUserProject response
      component = mountWithStore(props, store) // mount component
      await flushAllPromises() // wait for requests to resolve
      component.update() // update component after having resolved requests
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    describe('componentWillMount', () => {
      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_USER_PROJECT_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_USER_PROJECT_SUCCESS, payload: {} })
      })

    })

    describe('render', () => {
      it('should render expected divs', () => {
        expect(component.find('div[className="lessonFullSizeEditor"]').length).toBe(1)
        expect(component.find('CodeEditor').html()).toContain('CodeMirror cm-s-default')
        expect(component.find('CodeEditor').html()).toContain('react-codemirror2 CodeMirrorFull')
        expect(component.find('div[className="toolbarLabel"]').length).toBe(2)
        expect(component.find('div[className="toolbarButton"]').length).toBe(2)
      })

    })


  })


  describe('with not new userProject', () => {
    beforeEach(async() => {
      mountWithStore = (childProps, store) => {
        return mount(
          <MemoryRouter initialEntries={[`/projects/${userProjectId}`]}>
            <Provider store={store}>
              <Route
                component={ matchProps =>
                  <UserProject {...childProps} {...matchProps} />
                }
                path="/projects/:id"
              />
            </Provider>
          </MemoryRouter>
          , {
            context: {
              muiTheme: getMuiTheme()
              , match: { params: { id: userProjectId } }
            },
            childContextTypes: {
              muiTheme: PropTypes.object.isRequired
              , match: PropTypes.object.isRequired
            }
          })
      }
      setupStore()
      ApiFetch.mockImplementationOnce(() => Promise.resolve({})) // getUserProject response
      component = mountWithStore(props, store) // mount component
      await flushAllPromises() // wait for requests to resolve
      component.update() // update component after having resolved requests
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    describe('componentWillMount', () => {
      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_USER_PROJECT_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_USER_PROJECT_SUCCESS, payload: {} })
      })

      it('should pass the userProjectId and userId when making requests', () => {
        expect(ApiFetch.mock.calls[0][0]).toBe(`http://localhost:8080/api/userprojects/${userProjectId}`)
        expect(ApiFetch.mock.calls[0][1]).toEqual({ method: "GET" })
      })

    })


  })





})