const isPrevDisabled = (activeSlideIndex, lesson) => {
  const isFirstSlide = activeSlideIndex === 0
  return isFirstSlide
}

const isNextDisabled = (activeSlideIndex, lesson) => {
  const isFinalSlide = lesson.slides.length - 1 - activeSlideIndex === 0
  return isFinalSlide
}

export {
  isPrevDisabled
  , isNextDisabled
}