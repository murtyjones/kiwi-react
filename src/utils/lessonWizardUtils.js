const isPrevDisabled = (activeSlideIndex, lesson) => {
  const isFirstSlide = activeSlideIndex === 0
  return isFirstSlide
}

const isNextDisabled = (activeSlideIndex, lesson, isFetchingUserLessons) => {
  // will eventually check if student has not answered question here
  return isFetchingUserLessons
}

const isFinalSlide = (activeSlideIndex, lesson) => {
  return lesson.slides.length - 1 - activeSlideIndex === 0
}

export {
  isPrevDisabled
  , isNextDisabled
  , isFinalSlide
}