import React from 'react'
import find from 'lodash/find'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export const getActiveLessonId = combinedLessonData => {
  let activeLessonId = get(combinedLessonData, '[0].lesson._id', '')

  combinedLessonData.forEach((each, i) => {
    const prev = combinedLessonData[i - 1]

    const hasBeenStartedButNotCompleted = !isEmpty(each.userLesson) && !each.userLesson.hasBeenCompleted
    const hasNotBeenStartedButIsNext = isEmpty(each.userLesson) && !isEmpty(prev.userLesson) && prev.userLesson.hasBeenCompleted

    if (hasBeenStartedButNotCompleted || hasNotBeenStartedButIsNext)
      activeLessonId = each.lesson._id
  })

  return activeLessonId
}


export const makeCombinedLessonData = params => {
  const { orderOfPublishedLessons, lessons, userLessons } = params
  return orderOfPublishedLessons.map(lessonId => {

    const lesson = find(lessons, { _id: lessonId }) || {}
    const userLesson = find(userLessons, { lessonId }) || {}

    return { lesson, userLesson }
  })
}