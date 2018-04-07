import LESSON_SLIDE_TYPES from '../constants/LESSON_SLIDE_TYPES'
import { get } from 'lodash'

export const viewedEqualsComplete = (slideType) =>
  // must match the version in kiwi-node exactly.
  slideType === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE
  || slideType === LESSON_SLIDE_TYPES.FULL_PAGE_TEXT
  || slideType === LESSON_SLIDE_TYPES.TITLE
  || slideType === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR // this one will go away eventually

const isPrevDisabled = (activeSlideIndex, lesson) => {
  const isFirstSlide = activeSlideIndex === 0
  return isFirstSlide
}

const isNextDisabled = (activeSlideIndex, lesson, isFetchingUserLessons, formValues) => {
  // will eventually check if student has not answered question here
  if(isFetchingUserLessons) return true

  const currentUserLessonSlide = get(formValues, `answerData[${activeSlideIndex}]`, {})
  const currentLessonSlide = get(lesson, `slides[${activeSlideIndex}]`, {})
  if(currentUserLessonSlide.isAnsweredCorrectly || viewedEqualsComplete(currentLessonSlide.type))
    return false

  return true
}

const isFinalSlide = (activeSlideIndex, lesson) => {
  return lesson.slides.length - 1 - activeSlideIndex === 0
}

export {
  isPrevDisabled
  , isNextDisabled
  , isFinalSlide
}