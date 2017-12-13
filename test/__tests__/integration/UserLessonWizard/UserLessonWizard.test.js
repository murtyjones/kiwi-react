import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import { ACTIONS } from '../../../../src/constants'
import { notCombined } from '../../../../src/reducers/index'
import UserLessonWizard from '../../../../src/UserLessonWizard/UserLessonWizard'
import { setupIntegrationTest } from '../../../intSetup'

jest.mock('../../../../src/utils/ApiFetch')
import ApiFetch from '../../../../src/utils/ApiFetch'

describe('integration tests', () => {
  let store
    , dispatchSpy
    , router
    , component
    , props
    , chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterUserId = '5a262f3cd799747b257ace41'
    , payload1
    , payload2
    , lessonId
    , mounter
    , preMounter

  beforeEach(() => {
    payload1 = { body: 111 }
    payload2 = [{ body: 222 }]
    lessonId = 'fakeId'
    props = {}
    router = {}
    preMounter = () => {
      ApiFetch.mockImplementationOnce(() => Promise.resolve(payload1))
      ApiFetch.mockImplementationOnce(() => Promise.resolve(payload2))
      ;({ store, dispatchSpy } = setupIntegrationTest(notCombined, router))
      store.dispatch({ payload: { idToken: chesterAdminIdToken }, type: ACTIONS.LOGIN_SUCCESS })
    }
    mounter = (Child, childProps, store) => {
      return mount(
        <MemoryRouter initialEntries={[ '/lessons/fakeId' ]}>
          <Provider store={ store }>
            <Route
              component={ matchProps => <Child { ...childProps } { ...matchProps } />}
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

    describe('needsLesson', () => {
      beforeEach(() => {
        preMounter()
        component = mounter(UserLessonWizard, props, store)
      })

      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_SUCCESS, payload: payload1 })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: payload2 })
      })

      it('should pass the lessonId and userId when making requests', () => {
        expect(ApiFetch.mock.calls[0][0]).toBe(`http://localhost:8080/api/lessons/${lessonId}`)
        expect(ApiFetch.mock.calls[1][0]).toBe(`http://localhost:8080/api/userlessons?lessonId=${lessonId}&userId=${chesterUserId}`)
      })
    })



    describe('!needsLesson', () => {
      let lesson

      beforeEach(() => {
        lesson = {
          "_id" : lessonId,
          "isPublished" : true,
          "title" : "Print Statements!",
          "subtitle" : "How to show an output",
          "minutesToComplete" : 15,
          "slides" : [
            {
              "type" : "FULL_PAGE_TEXT",
              "instructions" : "<p><strong>Print Statement</strong>: Shows something (for example, words or numbers) in the output.</p><p><strong>Input</strong> is what we tell the computer</p><p><strong>Output</strong> is what shows up on the user’s screen.</p><p><br></p><p>Print Statements are really useful when you want to give instructions or explain something in more detail!</p>",
              "editorInput" : "print ???",
              "title" : "What is a Print Statement? ",
              "id" : "075866a6-7b18-4a6d-86c7-e4f5503e40af"
            },
            {
              "type" : "FULL_PAGE_CODE_EDITOR",
              "prompt" : "Remember, a print statement shows something like words or numbers in the output. Our input is on the left and our output is on the right. When you see items in purple, that is us defining something new. ",
              "editorInput" : "",
              "id" : "6f1a9e61-6fcf-4fec-96ba-558912478786"
            },
            {
              "type" : "FULL_PAGE_CODE_EDITOR",
              "prompt" : "We’re going to give you a print statement in the Input below. When you see something in green, we’re giving you an example to look at and practice. Check out the below print statement and write it on the left-hand side of the editor. Then hit the GO button.\n\n\n",
              "editorInput" : "#This is a comment\n#The computer ignores any code that has a \"#\" \n\n#try this example --> print “Hello World!”",
              "id" : "76915074-79eb-423c-b754-5151f099d947"
            },
            {
              "type" : "FULL_PAGE_CODE_EDITOR",
              "prompt" : "Print statements always include quotation marks “ “ and the word “print” with a lowercase p. Now it’s your turn to try! When you see items highlighted in yellow, that’s code you should try out!\n\nDo This: Write 15 print statements, describing your favorite things to do on a weekend.\n",
              "id" : "ebff60eb-04a3-44ad-9472-dabfc3ae2e1c",
              "editorInput" : "#Write 5 lines of what you like to do on the weekend\n\n\n\n\n#Write 5 lines describing who you like to spend the weekend with\n\n\n\n\n\n#Write 5 lines describing your favorite foods to eat on the weekend"
            },
            {
              "type" : "FULL_PAGE_TEXT",
              "instructions" : "<p>Let’s pretend you’re going on your dream vacation. You can go anywhere – the moon, the beach, a new country!</p><p><br></p><p>Think about where you want to go, how you will get there, what you need to bring and who you want to go with you.&nbsp;</p>",
              "title" : "Dream Vacation",
              "id" : "621cf963-8ae8-4460-b6e8-dda3fd196ef5"
            },
            {
              "type" : "FULL_PAGE_CODE_EDITOR",
              "prompt" : "Do This: Write 15 print statements, describing your dream vacation! Make sure you include all the details!",
              "id" : "9242b909-919b-4456-a587-c81e8db9a222"
            }
          ],
          "updatedAt" : "2017-12-08T04:40:08Z"
        }
        preMounter()
        store.dispatch({ payload: lesson, type: ACTIONS.GET_LESSON_SUCCESS })
        component = mounter(UserLessonWizard, props, store)
      })

      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_LESSON_REQUEST })
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_LESSON_SUCCESS, payload: payload1 })
        expect(dispatchSpy).not.toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: payload2 })
      })

      it('should pass the lessonId and userId when making requests', () => {
        expect(ApiFetch.mock.calls.length).toBe(0)
      })
    })



  })


})