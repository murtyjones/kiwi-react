import React from 'react'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { lessonLocationsBySection } from './LESSON_CONSTANTS'

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
  return lessonLocationsBySection.reduce((acc, sectionLocations, idx) => {
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

export const getLessonStatus = (orderedCombinedLessonData, activeLessonId) => {
  let pastActiveLessonId = false
  for (let i = 0, len = orderedCombinedLessonData.length; i < len; i++) {
    const e = orderedCombinedLessonData[i]
    if (!pastActiveLessonId && e.lesson._id !== activeLessonId) {
      return LESSON_STATUSES.AVAILABLE
    } else if (!pastActiveLessonId && e.lesson._id === activeLessonId) {
      pastActiveLessonId = true
      return LESSON_STATUSES.AVAILABLE
    } else if (pastActiveLessonId) {
      return LESSON_STATUSES.LOCKED
    }
  }
}