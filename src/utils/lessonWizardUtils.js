import LESSON_SLIDE_TYPES from '../constants/LESSON_SLIDE_TYPES'
import { get } from 'lodash'

export const viewedEqualsComplete = ({ type, shouldIncludeSuccessCriteria }) =>
  // must match the version in kiwi-node exactly.
  type === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE
  || type === LESSON_SLIDE_TYPES.FULL_PAGE_TEXT
  || type === LESSON_SLIDE_TYPES.TITLE
  || type === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR && !shouldIncludeSuccessCriteria

export const isPrevDisabled = (activeSlideIndex, lesson) => {
  const isFirstSlide = activeSlideIndex === 0
  return isFirstSlide
}

export const isNextDisabled = (activeSlideIndex, lesson, isFetchingUserLessons, formValues) => {
  // will eventually check if student has not answered question here
  if(isFetchingUserLessons) return true
  const currentUserLessonSlide = get(formValues, `answerData[${activeSlideIndex}]`, {})
  const currentLessonSlide = get(lesson, `slides[${activeSlideIndex}]`, {})

  if(currentUserLessonSlide.isAnsweredCorrectly || viewedEqualsComplete(currentLessonSlide))
    return false

  return true
}

export const isFinalSlide = (activeSlideIndex, lesson) => {
  return lesson.slides.length - 1 - activeSlideIndex === 0
}