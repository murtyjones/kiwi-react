import React from 'react'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isNumeric from '../utils/isNumeric'

import { lessonBubbleDisplayDataBySection, lessonMapNavigationDataBySection, NAV_OPTIONS } from './LESSON_CONSTANTS'

export const getActiveLessonId = orderedCombinedLessonData => {
  let activeLessonId = get(orderedCombinedLessonData, '[0].lesson._id', '') // default

  orderedCombinedLessonData.forEach((each, i) => {
    const prev = orderedCombinedLessonData[i - 1]
    const prevUserLesson = get(prev, 'userLesson', {})
    const userLesson = get(each, 'userLesson', {})

    const hasBeenStartedButNotCompleted = !isEmpty(userLesson) && !userLesson.hasBeenCompleted
    const hasNotBeenStartedButIsNext = isEmpty(userLesson) && !isEmpty(prevUserLesson) && prevUserLesson.hasBeenCompleted

    if (hasBeenStartedButNotCompleted || hasNotBeenStartedButIsNext)
      activeLessonId = each.lesson._id
  })

  return activeLessonId
}


export const getActiveLessonIndex = orderedCombinedLessonData => {
  return  findIndex(orderedCombinedLessonData, ({ lesson }) =>
    lesson._id === getActiveLessonId(orderedCombinedLessonData)
  )
}


export const makeCombinedLessonData = params => {
  const { orderOfPublishedLessons, lessons, userLessons } = params
  return orderOfPublishedLessons.map(lessonId => {

    const lesson = find(lessons, { _id: lessonId }) || {}
    const userLesson = find(userLessons, { lessonId }) || {}

    return { lesson, userLesson }
  })
}


export const getActiveSectionIndex = orderedCombinedLessonData => {
  const activeLessonIndex = getActiveLessonIndex(orderedCombinedLessonData)
  let runningTotal = 0, alreadySet = false
  return lessonBubbleDisplayDataBySection.reduce((acc, sectionLocations, idx) => {
    runningTotal += !idx ? sectionLocations.length - 1 : sectionLocations.length
    if (activeLessonIndex <= runningTotal && !alreadySet) {
      acc = idx
      alreadySet = true
    }
    return acc
  }, 0)
}


export const LESSON_STATUSES = {
  AVAILABLE: 'AVAILABLE'
  , LOCKED: 'LOCKED'
}


export const getLessonStatus = (orderedCombinedLessonData, currentLessonId, activeLessonId) => {
  let pastActiveLessonId = false
  for (let i = 0, len = orderedCombinedLessonData.length; i < len; i++) {
    const e = orderedCombinedLessonData[i]

    if (e.lesson._id === activeLessonId) {
      pastActiveLessonId = true
    }

    if (e.lesson._id === currentLessonId) {
      return LESSON_STATUSES.AVAILABLE
    } else if (pastActiveLessonId) {
      return LESSON_STATUSES.LOCKED
    }

  }
}


export const getSectionEndingLessonIndex = (activeSectionIndex) => {
  return lessonBubbleDisplayDataBySection.reduce((acc, each, idx) => {
    if (idx <= activeSectionIndex) {
      acc += each.length
    }
    return acc
  }, -1)
}

export const getSectionStartingLessonIndex = (activeSectionIndex) => {
  return lessonBubbleDisplayDataBySection.reduce((acc, each, idx) => {
    if (idx < activeSectionIndex) {
      acc += each.length
    }
    return acc
  }, 0)
}


export const getIsLastLessonInSectionCompleted = (activeSectionIndex, orderedCombinedLessonData) => {
  const endingLessonIndex = getSectionEndingLessonIndex(activeSectionIndex)
  const combinedLessonData = orderedCombinedLessonData[endingLessonIndex]
  return get(combinedLessonData, 'userLesson.hasBeenCompleted', false)
}

export const isNextSectionOrSectionsUnlocked = (activeSectionIndex, orderedCombinedLessonData) => {
  if (!getIsLastLessonInSectionCompleted(activeSectionIndex, orderedCombinedLessonData)) {
    return false
  }

  const { adjacentSectionIndices } = lessonMapNavigationDataBySection[activeSectionIndex] || {}

  return Object.values(adjacentSectionIndices).reduce((acc, each, idx) => {
    const navArrowDirection = Object.keys(adjacentSectionIndices)[idx]
    
    if(
      doesSectionUnlockDirection(navArrowDirection, activeSectionIndex) &&
      getIsSectionNavArrowUnlocked({ navArrowDirection, orderedCombinedLessonData, activeSectionIndex }) &&
      doesRequireLessonsCompletion(navArrowDirection, activeSectionIndex)
    ) {
      acc = true
    }
    return acc
  }, false)

}

export const doesRequireLessonsCompletion = (navArrowDirection, activeSectionIndex) => {
  const { adjacentSectionIndices } = lessonMapNavigationDataBySection[activeSectionIndex]
  const { requiresLessonsCompletion } = adjacentSectionIndices[navArrowDirection] || {}
  return requiresLessonsCompletion
}

export const isSectionAdjacent = (navArrowDirection, activeSectionIndex) => {
  const { adjacentSectionIndices } = lessonMapNavigationDataBySection[activeSectionIndex]
  const { sectionIndex } = adjacentSectionIndices[navArrowDirection] || {}
  return isNumeric(sectionIndex)
}


export const doesSectionUnlockDirection = (navArrowDirection, activeSectionIndex) => {
  const { adjacentSectionIndices } = lessonMapNavigationDataBySection[activeSectionIndex]
  const { sectionIndex, unlocksSection } = adjacentSectionIndices[navArrowDirection] || {}
  return isNumeric(sectionIndex) && unlocksSection
}


export const getIsSectionNavArrowUnlocked = params => {
  const { navArrowDirection, orderedCombinedLessonData, activeSectionIndex } = params

  if (!doesSectionUnlockDirection(navArrowDirection, activeSectionIndex)) {
    return false
  }

  if (!doesRequireLessonsCompletion(navArrowDirection, activeSectionIndex)) {
    return true
  }

  return getIsLastLessonInSectionCompleted(activeSectionIndex, orderedCombinedLessonData)
}


export const getArrowSectionIndex = (navArrowDirection, activeSectionIndex) => {
  const { adjacentSectionIndices } = lessonMapNavigationDataBySection[activeSectionIndex]
  const { sectionIndex } = adjacentSectionIndices[navArrowDirection] || {}
  return sectionIndex
}

export const getIsFinalSection = activeSectionIndex =>
  lessonBubbleDisplayDataBySection.length - 1 === activeSectionIndex
