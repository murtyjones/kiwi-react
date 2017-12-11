const isPrevDisabled = (activeSlideIndex, lesson) => {
  const isFirstSlide = activeSlideIndex === 0
  return isFirstSlide
}

const isNextDisabled = (activeSlideIndex, lesson) => {
  // const isFinalSlide = lesson.slides.length - 1 - activeSlideIndex === 0
  // return isFinalSlide

  return false // will eventually be true sometimes, like when the student has not answer the question
}

const isFinalSlide = (activeSlideIndex, lesson) => {
  return lesson.slides.length - 1 - activeSlideIndex === 0
}

export {
  isPrevDisabled
  , isNextDisabled
  , isFinalSlide
}