import LESSON_SLIDE_TYPES from '../constants/LESSON_SLIDE_TYPES'
import get from 'lodash/get'

export const hasSuccessCriteria = ({ type, shouldIncludeSuccessCriteria }) =>
  type === LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR && shouldIncludeSuccessCriteria
  || type === LESSON_SLIDE_TYPES.MULTIPLE_CHOICE

export const isPrevDisabled = (activeSlideIndex, lesson) => {
  const isFirstSlide = activeSlideIndex === 0
  return isFirstSlide
}

export const isNextDisabled = (activeSlideIndex, lesson, isFetchingUserLessons, formValues) => {
  if(isFetchingUserLessons) return true
  const currentUserLessonSlide = get(formValues, `answerData[${activeSlideIndex}]`, {})
  const currentLessonSlide = get(lesson, `slides[${activeSlideIndex}]`, {})

  return !currentUserLessonSlide.isAnsweredCorrectly && hasSuccessCriteria(currentLessonSlide)
}

export const isFinalSlide = (activeSlideIndex, lesson) => {
  return lesson.slides.length - 1 - activeSlideIndex === 0
}