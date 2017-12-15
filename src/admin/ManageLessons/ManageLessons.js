import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, find, get } from 'lodash'

import LessonWidget from './LessonWidget'
import { KiwiLink } from '../../common/KiwiLink'
import { getManyLessons, putLesson, getLessonOrder, putLessonOrder } from '../../actions/index'
import { SortableList } from '../../common/SortableComponents'
import { reorderLessons } from '../../utils/lessonOrderUtils'


class ManageLessons extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    putLesson: T.func.isRequired
    , getManyLessons: T.func.isRequired
    , putLessonOrder: T.func.isRequired
    , getLessonOrder: T.func.isRequired
  }

  componentWillMount() {
    const { getManyLessons, getLessonOrder } = this.props
    getManyLessons()
    getLessonOrder()
  }

  getLessonsByType = (lessonsById) => {
    const { orderOfPublishedLessons } = this.props
    const lessons = Object.values(lessonsById)
    const published = orderOfPublishedLessons.reduce((acc, lessonId) => {
      const lesson = find(lessons, { _id: lessonId })
      if(lesson) {
        acc.push(lesson)
      }
      return acc
    }, [])
    const unpublished = lessons.reduce((acc, lesson) => {
      if(!lesson.isPublished) {
        acc.push(lesson)
      }
      return acc
    }, [])

    return {
      published
      , unpublished
    }
  }

  onSortEnd = (event) => {
    const { putLessonOrder, lessonOrder, orderOfPublishedLessons } = this.props
    const newWorldOrder = reorderLessons({ event, orderOfPublishedLessons })
    putLessonOrder({
      ...lessonOrder,
      order: newWorldOrder
    })
  }

  render() {
    const { lessonsById } = this.props
    const lessonsByType = this.getLessonsByType(lessonsById)

    return (
      <div>
        <KiwiLink to={ '/admin/lesson/new' }>
          New Lesson
        </KiwiLink>
        <h5>Published</h5>
        <SortableList
          items={ lessonsByType.published }
          onSortEnd={ this.onSortEnd }
          component={ LessonWidget }
        />
        <h5>Unpublished</h5>
        { lessonsByType.unpublished.map((lesson, i) => {
          return <LessonWidget key={ i } item={ lesson } draggable={ false } />
        }) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lessonMetadata: { lessonOrder }, lessons: { lessonsById } } = state

  const orderOfPublishedLessons = get(lessonOrder, 'order', [])

  return {
    lessonsById
    , lessonOrder
    , orderOfPublishedLessons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
    , putLesson: (params) => dispatch(putLesson(params))
    , putLessonOrder: (params) => dispatch(putLessonOrder(params))
    , getLessonOrder: () => dispatch(getLessonOrder())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageLessons))