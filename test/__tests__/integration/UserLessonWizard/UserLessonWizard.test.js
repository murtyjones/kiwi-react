import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Route from 'react-router-dom/Route'
import Link from 'react-router-dom/Link'
import MemoryRouter from 'react-router-dom/MemoryRouter'

import { ACTIONS, LESSON_SLIDE_TYPES } from '../../../../src/constants'
import { notCombined } from '../../../../src/reducers/index'
import UserLessonWizard from '../../../../src/UserLessonWizard/UserLessonWizard'
import { setupIntegrationTest } from '../../../integrationSetup'

import ApiFetch from '../../../../src/utils/ApiFetch'
import setTimeoutAsync from '../../../../src/utils/setTimeoutAsync'
import '../../../__mocks__/codeMirrorDom'

export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('UserLessonWizard', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , lessonId
    , userLessonId
    , slide1Id, slide2Id, slide3Id, slide4Id, slide5Id
    , variables
    , userVariables
    , lesson
    , userLesson
    , lessonTheme
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
    slide5Id = 'id5'
    lessonId = 'fakeLessonId'
    userLessonId = 'fakeUserLessonId'
    variables = []
    userVariables = []
    lesson = {
      _id: lessonId
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
          , instructionsLabel: 'hiya'
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
          type: LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE
          , exampleLabel: 'hiya'
          , example: "slide4Example"
          , id: slide4Id
        },
        {
          type: LESSON_SLIDE_TYPES.MULTIPLE_CHOICE
          , instructions: "<p>slide5Instructions</p>"
          , choices: [ 'choice #1', 'choice #2', 'choice #3', 'choice #4' ]
          , correctAnswerIndex: 2 // choice #3
          , id: slide5Id
        }
      ],
      updatedAt: "2017-12-08T04:40:08Z"
    }
    userLesson = {
      _id: userLessonId,
      lessonId,
      answerData: {
        [slide2Id]: {  }
        , [slide1Id]: { answer: "" }
        , [slide2Id]: { answer: "" }
        , [slide3Id]: { answer: "slide3Answer" }
        , [slide4Id]: { answer: "" }
        , [slide5Id]: { answer: "" }
      }
    }
    lessonTheme = {

    }
    setupStore = () => {
      ({ store, dispatchSpy } = setupIntegrationTest(notCombined, router))
      store.dispatch({ payload: { idToken: chesterAdminIdToken }, type: ACTIONS.LOGIN_SUCCESS })
    }
    mountWithStore = (childProps, store) => {
      return mount(
        <MemoryRouter initialEntries={[ `/lessons/${lessonId}` ]}>
          <Provider store={ store }>
            <Route
              component={ matchProps =>
                <UserLessonWizard { ...childProps } { ...matchProps } />
              }
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


  describe('with no lesson or userLesson yet loaded, but both exist', () => {
    beforeEach(async() => {
      setupStore()
      ApiFetch.mockImplementationOnce(() => Promise.resolve(variables)) // getManyVariables response
      ApiFetch.mockImplementationOnce(() => Promise.resolve(userVariables)) // getManyUserVariables response
      ApiFetch.mockImplementationOnce(() => Promise.resolve(lesson)) // getLesson response
      ApiFetch.mockImplementationOnce(() => Promise.resolve([userLesson])) // getManyUserLessons response
      component = mountWithStore(props, store) // mount component
      // wait for initial mounting to complete:
      await flushAllPromises()
      component.update()
      // wait for requests to resolve so that component can render:
      await flushAllPromises()
      component.update()
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    describe('componentWillMount', () => {
      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_VARIABLES_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_VARIABLES_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).toBeCalledWith({ payload: variables, type: ACTIONS.GET_MANY_USER_VARIABLES_SUCCESS })
        expect(dispatchSpy).toBeCalledWith({ payload: userVariables, type: ACTIONS.GET_MANY_VARIABLES_SUCCESS })
        expect(dispatchSpy).toBeCalledWith({ payload: lesson, type: ACTIONS.GET_LESSON_SUCCESS })
        expect(dispatchSpy).toBeCalledWith({ payload: [userLesson], type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS })
      })

      it('should pass the lessonId and userId when making requests', () => {
        expect(ApiFetch.mock.calls[0][0]).toBe(`http://localhost:8080/user-variables`)
        expect(ApiFetch.mock.calls[0][1]).toEqual({ method: 'GET' })
        expect(ApiFetch.mock.calls[1][0]).toBe(`http://localhost:8080/variables`)
        expect(ApiFetch.mock.calls[1][1]).toEqual({ method: 'GET' })
        expect(ApiFetch.mock.calls[2][0]).toBe(`http://localhost:8080/lessons/${lessonId}`)
        expect(ApiFetch.mock.calls[2][1]).toEqual({ method: 'GET' })
        expect(ApiFetch.mock.calls[3][0]).toBe(`http://localhost:8080/user-lessons?lessonId=${lessonId}&userId=${chesterAdminUserId}`)
        expect(ApiFetch.mock.calls[3][1]).toEqual({ method: 'GET' })
      })

    })


    describe('render', () => {
      it('should render one forward button to start', async () => {
        expect(component.find('div[id="nextButton"]').length).toBe(1)
      })

      it('should NOT render one back button to start', async () => {
        expect(component.find('div[id="prevButton"]').length).toBe(0)
      })

      it('should render the form', async () => {
        expect(component.find('form[className="lessonWizardForm flex flexFlowColumn"]').length).toBe(1)
      })

      it('should render the form content div', async () => {
        expect(component.find('div[className="lessonWizardFormContent flexZeroOneAuto"]').length).toBe(1)
      })

    })


    describe('interactions', () => {
      let putLessonPayloadApiResponse
      beforeEach(async () => {
        putLessonPayloadApiResponse = {
          before: {
            ...userLesson
          }
          , after: {
            ...userLesson
          }
        }
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from kiwi-api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from kiwi-api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from kiwi-api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from kiwi-api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from kiwi-api when updating a lesson
      })

      describe('slide 1', () => {
        it('should render first slide title', async () => {
          // expect(component.find('div[id="title"]').length).toBe(1)
          expect(component.find('div[id="title"]').text()).toEqual(lesson.slides[0].title)
        })

        it('should render first slide subtitle', async () => {
          expect(component.find('div[id="subtitle"]').length).toBe(1)
          expect(component.find('div[id="subtitle"]').text()).toEqual(lesson.slides[0].subtitle)
        })
      })

      describe('slides 1 - 2', () => {
        it("should dispatch PUT request after clicking 'next' button", async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.PUT_USER_LESSON_REQUEST })
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex by 1 when clicking next button", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
        })

        // it('should have the expected slide 2 title', async () => {
        //   component.find('div[id="nextButton"]').at(0).simulate('click')
        //   await flushAllPromises()
        //   expect(component.find('div[id="title"]').length).toBe(1)
        // })

        it('should have the expected slide 2 instructions', async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="speechBubbleLabel"]').length).toBe(1)
          expect(component.find('div[id="speechBubble"]').length).toBe(1)
          expect(component.find('div[id="speechBubble"]').props()).toHaveProperty('dangerouslySetInnerHTML', {__html: lesson.slides[1].instructions})
        })

        it('should call ApiFetch with expected params on next click', async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          delete userLesson._id
          expect(ApiFetch).toBeCalledWith(
            `http://localhost:8080/user-lessons/${userLessonId}`,
            {
              body: {
                ...userLesson,
                answerData: [
                  { answer: "", isViewed: true }
                  , userLesson.answerData[slide2Id]
                  , userLesson.answerData[slide3Id]
                  , userLesson.answerData[slide4Id]
                  , userLesson.answerData[slide5Id]
                ],
                id: userLessonId,
                userId: chesterAdminUserId
              },
              method: 'PUT'
            }
          )
        })

      })

      describe('slides 1 - 3', () => {
        it("should dispatch PUT request after clicking next button twice", async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex to 2 when clicking next button twice", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
        })

        it("should change activeSlideIndex back to 0 clicking next, then prev button", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should change the focus to slide 3 (full sized editor) when clicking next twice', async () => {
          expect(component.find('div[className="lessonFullSizeEditor flexOneOneAuto"]').length).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonFullSizeEditor flexOneOneAuto"]').length).toBe(1)
        })

        it('should have the expected beginning slide 3 content when clicking next twice', async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonFullSizeEditor flexOneOneAuto"]').html()).toEqual(expect.stringContaining(userLesson.answerData[slide3Id].answer))
        })
      })

      describe('slides 1 - 4', () => {
        it("should dispatch PUT request after clicking next button thrice", async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex by 3 when clicking next button thrice", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(3)
        })

        it('should be able to progress to slide 4 and back', async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(3)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should change the focus to slide 4', async () => {
          expect(component.find('div[className="fullPageExampleContainer"]').length).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="exampleContainer"]').length).toBe(1)
        })

        it('should have expected slide 4 content', async () => {
          expect(component.find('div[className="fullPageExplanation"]').length).toBe(0)
          expect(component.find('div[className="exampleLabel"]').length).toBe(0)
          expect(component.find('div[className="fullPageExample"]').length).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="speechBubbleLabel"]').length).toBe(1)
          expect(component.find('div[id="speechBubble"]').length).toBe(1)
          expect(component.find('div[id="speechBubble"]').props()).toHaveProperty('dangerouslySetInnerHTML', {__html: lesson.slides[3].example})
        })
      })

      describe('slides 1 - 5', () => {
        it("should dispatch PUT request after clicking next button four times", async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex by 4 when clicking next button four times", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(4)
        })

        it('should be able to progress to slide 5 and back', async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(3)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(4)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(3)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('div[id="prevButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should have expected slide 5 content', async () => {
          expect(component.find('div[className="choices"]').length).toBe(0)
          expect(component.find('div[className="instructions"]').length).toBe(0)
          expect(component.find('div[id="choice0"]').length).toBe(0)
          expect(component.find('div[id="choice1"]').length).toBe(0)
          expect(component.find('div[id="choice2"]').length).toBe(0)
          expect(component.find('div[id="choice3"]').length).toBe(0)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="choices"]').length).toBe(1)
          expect(component.find('div[id="speechBubble"]').length).toBe(1)
          expect(component.find('div[id="choice0"]').length).toBe(1)
          expect(component.find('div[id="choice1"]').length).toBe(1)
          expect(component.find('div[id="choice2"]').length).toBe(1)
          expect(component.find('div[id="choice3"]').length).toBe(1)

          expect(component.find('div[id="choice0"]').html()).toEqual(expect.stringContaining(lesson.slides[4].choices[0]))
          expect(component.find('div[id="choice1"]').html()).toEqual(expect.stringContaining(lesson.slides[4].choices[1]))
          expect(component.find('div[id="choice2"]').html()).toEqual(expect.stringContaining(lesson.slides[4].choices[2]))
          expect(component.find('div[id="choice3"]').html()).toEqual(expect.stringContaining(lesson.slides[4].choices[3]))
        })

        it('should allow choice selection', async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()

          expect(component.find('div[id="choice1-selected"]').length).toBe(0)
          component.find('div[id="choice1"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="choice1-selected"]').length).toBe(1)
        })

        it('should have a disabled next button to begin', async () => {
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()

          expect(component.find('UserLessonWizardForm').length).toBe(1)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').length).toBe(1)
        })

        it('should NOT have a disabled next button if the user has already answered correctly', async () => {
          const alreadyAnsweredResponse = {
            before: { ...userLesson }
            , after: { ...userLesson }
          }

          alreadyAnsweredResponse.after.answerData[slide5Id].isAnsweredCorrectly = true

          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()

          ApiFetch.mockImplementationOnce(() => Promise.resolve(alreadyAnsweredResponse)) // response from kiwi-api when updating a lesson

          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()

          expect(component.find('UserLessonWizardForm').length).toBe(1)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          // The component will unmount if this is the last slide and next is clicked.
          // NOTE: This test will break if a slide is added to the lesson object,
          // but can be fixed by changing it to be based on activeSlideIndex
          expect(component.find('UserLessonWizardForm').length).toBe(0)
        })

        it('should enable next button if user answers correctly', async () => {
          const correctAnswerResponse = {
            before: { ...userLesson }
            , after: { ...userLesson }
          }

          correctAnswerResponse.after.answerData[slide5Id].isAnsweredCorrectly = true

          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()

          // make choice
          component.find('div[id="choice1"]').at(0).simulate('click')
          await flushAllPromises()

          ApiFetch.mockImplementationOnce(() => Promise.resolve(correctAnswerResponse)) // response from kiwi-api when updating a lesson

          // send choice to server
          component.find('div[id="checkAnswerButton"]').at(0).simulate('click')
          await flushAllPromises()


          expect(component.find('UserLessonWizardForm').length).toBe(1)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          // The component will unmount if this is the last slide and next is clicked.
          // NOTE: This test will break if a slide is added to the lesson object,
          // but can be fixed by changing it to be based on activeSlideIndex
          expect(component.find('UserLessonWizardForm').length).toBe(0)
        })

        it('should NOT enable next button if user answers incorrectly', async () => {
          const incorrectAnswerResponse = {
            before: { ...userLesson }
            , after: { ...userLesson }
          }

          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()

          // make choice
          component.find('div[id="choice1"]').at(0).simulate('click')
          await flushAllPromises()

          ApiFetch.mockImplementationOnce(() => Promise.resolve(incorrectAnswerResponse)) // response from kiwi-api when updating a lesson

          // send choice to server
          component.find('div[id="checkAnswerButton"]').at(0).simulate('click')
          await flushAllPromises()


          expect(component.find('UserLessonWizardForm').length).toBe(1)
          component.find('div[id="nextButton"]').at(0).simulate('click')
          await flushAllPromises()
          // The component will unmount if this is the last slide and next is clicked.
          // NOTE: This test will break if a slide is added to the lesson object,
          // but can be fixed by changing it to be based on activeSlideIndex
          expect(component.find('UserLessonWizardForm').length).toBe(1)
        })

      })


    })


  })





})
