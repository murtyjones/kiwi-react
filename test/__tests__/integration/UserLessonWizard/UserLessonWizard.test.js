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
    , slide1Id, slide2Id, slide3Id
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
    lessonId = 'fakeLessonId'
    userLessonId = 'fakeUserLessonId'
    lesson = {
      _id: lessonId,
      isPublished: true,
      title: "Print Statements!",
      subtitle: "How to show an output",
      minutesToComplete: 15,
      slides: [
        {
          type: LESSON_SLIDE_TYPES.FULL_PAGE_TEXT,
          instructions: "<p>slide1Instructions</p>",
          editorInput: "slide1EditorInput",
          title: "What is a Print Statement? ",
          id: slide1Id
        },
        {
          type: LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR,
          prompt: "slide2Prompt",
          editorInput: "slide2EditorInput",
          id: slide2Id
        },
        {
          type: LESSON_SLIDE_TYPES.HALF_HALF,
          instructions: "<p>slide3Instructions</p>",
          editorInput: "slide3EditorInput",
          id: slide3Id
        }
      ],
      updatedAt: "2017-12-08T04:40:08Z"
    }
    userLesson = {
      _id: userLessonId,
      lessonId,
      answerData: {
        [slide1Id]: {  }
        , [slide2Id]: { answer: "slide2Answer" }
        , [slide3Id]: { answer: "" }
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


  describe('with existing userLesson', () => {
    beforeEach(async() => {
      setupStore()
      ApiFetch.mockImplementationOnce(() => Promise.resolve(lesson)) // getLesson response
      ApiFetch.mockImplementationOnce(() => Promise.resolve([userLesson])) // getManyUserLessons response
      ApiFetch.mockImplementationOnce(() => Promise.resolve(lessonTheme)) // getManyUserLessons response
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
        expect(ApiFetch.mock.calls[1][0]).toBe(`http://localhost:8080/api/userlessons?lessonId=${lessonId}&userId=${chesterAdminUserId}`)
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

      it('should render slide title', async () => {
        expect(component.find('div[id="title"]').length).toBe(1)
      })

      it('should render first slide instructions', async () => {
        expect(component.find('div[id="instructions"]').length).toBe(1)
        expect(component.find('div[id="instructions"]').props()).toHaveProperty('dangerouslySetInnerHTML', {__html: lesson.slides[0].instructions})
      })

    })


    describe('interaction', () => {
      let putLessonPayloadApiResponse, firstSlideNext, firstSlidePrev, secondSlideNext, secondSlidePrev
      beforeEach(async () => {
        firstSlidePrev = 0
        firstSlideNext = 1
        secondSlidePrev = 2
        secondSlideNext = 3
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
      })

      it('should dispatch PUT request with expected params', async () => {
        component.find('svg').at(1).simulate('click')
        await flushAllPromises()
        expect(dispatchSpy).toBeCalledWith({ type: ACTIONS.PUT_USER_LESSON_REQUEST })
        delete userLesson._id
        expect(ApiFetch).toBeCalledWith(
          `http://localhost:8080/api/userlessons/${userLessonId}`,
          {
            body: {
              ...userLesson,
              answerData: [
                { answer: "", id: slide1Id, isViewed: true }
                , userLesson.answerData[slide2Id]
                , userLesson.answerData[slide3Id]
              ],
              id: userLessonId
            },
            method: "PUT"
          }
        )
      })

      describe('1 click', () => {
        it("should dispatch PUT request after clicking 'next' button", async () => {
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
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

        it('should change the focus to slide 2 (full sized editor)', async () => {
          expect(component.find('div[className="lessonFullSizeEditor"]').length).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonFullSizeEditor"]').length).toBe(1)
        })

        it('should have the expected beginning slide 2 content', async () => {
          // prepopulate userlesson with answer and expect that over prompt
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonFullSizeEditor"]').html()).toEqual(expect.stringContaining(userLesson.answerData[slide2Id].answer))
        })

      })

      describe('2 clicks', () => {
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

        it("should change activeSlideIndex by 2 when clicking next button twice", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(2)
        })

        it("should change activeSlideIndex when clicking next, then prev button", async () => {
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlidePrev).simulate('click')
          await flushAllPromises()
          expect(component.find('UserLessonWizardForm').prop('activeSlideIndex')).toBe(0)
        })

        it('should change the focus to slide 3 (half sized editor) when clicking next twice', async () => {
          expect(component.find('div[className="lessonHalfSizeEditorRight"]').length).toBe(0)
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonHalfSizeEditorRight"]').length).toBe(1)
        })

        it('should have the expected beginning slide 3 content when clicking next twice', async () => {
          // prepopulate userlesson with answer and expect that over prompt
          component.find('svg').at(firstSlideNext).simulate('click')
          await flushAllPromises()
          component.find('svg').at(secondSlideNext).simulate('click')
          await flushAllPromises()
          expect(component.find('div[className="lessonHalfSizeEditorRight"]').html()).toEqual(expect.stringContaining(userLesson.answerData[slide3Id].answer))
        })

      })

    })


  })





})