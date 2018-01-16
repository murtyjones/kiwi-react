import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Route, Link, MemoryRouter } from 'react-router-dom'

import { ACTIONS, LESSON_SLIDE_TYPES } from '../../../../src/constants'
import { notCombined } from '../../../../src/reducers/index'
import UserLessonWizard from '../../../../src/UserLessonWizard/UserLessonWizard'
import { setupIntegrationTest } from '../../../integrationSetup'

import ApiFetch from '../../../../src/utils/ApiFetch'
import '../../../__mocks__/codeMirrorDom'

export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('UserLessonWizard', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , lessonId
    , userLessonId
    , slide2Id, slide3Id, slide4Id, slide1Id
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
    lessonId = 'fakeLessonId'
    userLessonId = 'fakeUserLessonId'
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
          , explanation: "<p>slide4Explanation</p>"
          , example: "slide4Example"
          , id: slide4Id
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
      ApiFetch.mockImplementationOnce(() => Promise.resolve(lesson)) // getLesson response
      ApiFetch.mockImplementationOnce(() => Promise.resolve([userLesson])) // getManyUserLessons response
      component = mountWithStore(props, store) // mount component
      await flushAllPromises() // wait for requests to resolve
      component.update() // update component after having resolved requests
    })

    afterEach(() => {
      ApiFetch.mockReset()
    })

    describe('componentWillMount', () => {
      it('should dispatch the appropriate requests', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_REQUEST })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_REQUEST })
      })

      it('should dispatch success methods with resolved payloads', () => {
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_LESSON_SUCCESS, payload: lesson })
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.GET_MANY_USER_LESSONS_SUCCESS, payload: [userLesson] })
      })

      it('should pass the lessonId and userId when making requests', () => {
        expect(ApiFetch.mock.calls[0][0]).toBe(`http://localhost:8080/api/lessons/${lessonId}`)
        expect(ApiFetch.mock.calls[0][1]).toEqual({ method: "GET" })
        expect(ApiFetch.mock.calls[1][0]).toBe(`http://localhost:8080/api/userlessons?lessonId=${lessonId}&userId=${chesterAdminUserId}`)
        expect(ApiFetch.mock.calls[1][1]).toEqual({ method: "GET" })
      })

    })


    describe('render', () => {
      it('should render two svg buttons for forward and back buttons', async () => {
        expect(component.find('svg').length).toBe(2)
      })

      it('should render the form', async () => {
        expect(component.find('form[className="lessonWizardForm"]').length).toBe(1)
      })

      it('should render the form content div', async () => {
        expect(component.find('div[className="lessonWizardFormContent"]').length).toBe(1)
      })

    })


    describe('interactions', () => {
      let putLessonPayloadApiResponse, firstSlideNext, firstSlidePrev, secondSlideNext, secondSlidePrev, thirdSlidePrev, thirdSlideNext, fourthSlidePrev, fourthSlideNext
      beforeEach(async () => {
        firstSlidePrev = 0
        firstSlideNext = 1
        secondSlidePrev = 0
        secondSlideNext = 1
        thirdSlidePrev = 2
        thirdSlideNext = 3
        fourthSlidePrev = 0
        fourthSlideNext = 1 // ????
        putLessonPayloadApiResponse = {
          before: {
            ...userLesson
          }
          , after: {
            ...userLesson
          }
        }
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from Kiwi-Api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from Kiwi-Api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from Kiwi-Api when updating a lesson
        ApiFetch.mockImplementationOnce(() => Promise.resolve(putLessonPayloadApiResponse)) // response from Kiwi-Api when updating a lesson
      })

      describe('slide 1', () => {
        it('should render first slide title', async () => {
          expect(component.find('div[id="title"]').length).toBe(1)
          expect(component.find('div[id="title"]').text()).toEqual(lesson.slides[0].title)
        })

        it('should render first slide subtitle', async () => {
          expect(component.find('div[id="subtitle"]').length).toBe(1)
          expect(component.find('div[id="subtitle"]').text()).toEqual(lesson.slides[0].subtitle)
        })

        it('should render first slide description', async () => {
          expect(component.find('div[id="description"]').length).toBe(1)
          expect(component.find('div[id="description"]').text()).toEqual(lesson.slides[0].description)
        })

        it('should set slide 1 to viewed', async () => {
          expect(component.find('UserLessonWizardForm').props('initialValues').currentValues.answerData[0].isViewed).toEqual(true)
        })

      })

      describe('slides 1 - 2', () => {
        it("should dispatch PUT request after clicking 'next' button", async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.PUT_USER_LESSON_REQUEST })
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex by 1 when clicking next button", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
        })

        it("should NOT change activeSlideIndex when clicking prev button", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlidePrev).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should have the expected slide 2 title', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="title"]').length).toBe(1)
        })

        it('should have the expected slide 2 instructions', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[id="instructions"]').length).toBe(1)
          expect(component.find('div[id="instructions"]').props()).toHaveProperty('dangerouslySetInnerHTML', {__html: lesson.slides[1].instructions})
        })

        it('should set slide 2 to viewed', async () => {
          expect(component.find('UserLessonWizardForm').props('initialValues').currentValues.answerData[1].isViewed).toEqual(undefined)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').props('initialValues').currentValues.answerData[1].isViewed).toEqual(true)
        })

        it('should call ApiFetch with expected params on next click', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          delete userLesson._id
          expect(ApiFetch).toBeCalledWith(
            `http://localhost:8080/api/userlessons/${userLessonId}`,
            {
              body: {
                ...userLesson,
                answerData: [
                  { answer: "", isViewed: true }
                  , userLesson.answerData[slide2Id]
                  , userLesson.answerData[slide3Id]
                  , userLesson.answerData[slide4Id]
                ],
                id: userLessonId
              },
              method: "PUT"
            }
          )
        })

      })

      describe('slides 1 - 3', () => {
        it("should dispatch PUT request after clicking next button twice", async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex to 2 when clicking next button twice", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
        })

        it("should change activeSlideIndex back to 0 clicking next, then prev button", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('svg').at(secondSlidePrev).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should change the focus to slide 3 (full sized editor) when clicking next twice', async () => {
          expect(component.find('div[className="lessonFullSizeEditor"]').length).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonFullSizeEditor"]').length).toBe(1)
        })

        it('should have the expected beginning slide 3 content when clicking next twice', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonFullSizeEditor"]').html()).toEqual(expect.stringContaining(userLesson.answerData[slide3Id].answer))
        })

        it('should set slide 3 to viewed', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').props('initialValues').currentValues.answerData[2].isViewed).toEqual(true)
        })

        it('should call ApiFetch after clicking save button in lessonFullSizeEditor', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          const saveButton = component.find('div[className="toolbarButton"]').at(0)
          const beforeCallCount = ApiFetch.mock.calls.length
          saveButton.simulate('click')
          await flushAllPromises()
          const afterCallCount = ApiFetch.mock.calls.length
          expect(afterCallCount - beforeCallCount).toEqual(1)
        })

      })

      describe('slides 1 - 4', () => {
        it("should dispatch PUT request after clicking next button thrice", async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(thirdSlideNext).simulate('click')
          await flushAllPromises()
          expect(dispatchSpy).toBeCalledWith({
            type: ACTIONS.PUT_USER_LESSON_SUCCESS,
            payload: putLessonPayloadApiResponse
          })
        })

        it("should change activeSlideIndex by 3 when clicking next button thrice", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(thirdSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(3)
        })

        it('should be able to progress to slide 4', async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
          component.find('svg').at(thirdSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(3)
          component.find('svg').at(fourthSlidePrev).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
          component.find('svg').at(thirdSlidePrev).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(1)
          component.find('svg').at(secondSlidePrev).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should change the focus to slide 4', async () => {
          expect(component.find('div[className="fullPageExampleContainer"]').length).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(thirdSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="fullPageExampleContainer"]').length).toBe(1)
        })

        it('should have expected slide 4 content', async () => {
          expect(component.find('div[className="fullPageExplanation"]').length).toBe(0)
          expect(component.find('div[className="exampleLabel"]').length).toBe(0)
          expect(component.find('div[className="fullPageExample"]').length).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(thirdSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="fullPageExplanation"]').html()).toEqual(expect.stringContaining(lesson.slides[3].explanation))
          expect(component.find('div[className="fullPageExample"]').text()).toEqual(lesson.slides[3].example)
          expect(component.find('div[className="exampleLabel"]').text()).toEqual('Example')
        })

        it('should set slide 4 to viewed', async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(thirdSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').props('initialValues').currentValues.answerData[3].isViewed).toEqual(true)
        })

      })


    })


  })





})