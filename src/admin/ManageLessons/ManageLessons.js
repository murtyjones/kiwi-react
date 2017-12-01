import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, find } from 'lodash'

import LessonWidget from './LessonWidget'
import { KiwiLink } from '../../common/KiwiLink'
import { getManyLessons, putLesson } from '../../actions/index'
import { SortableList } from '../../common/SortableComponents'


class ManageLessons extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    putLesson: T.func.isRequired
    , getManyLessons: T.func.isRequired
  }

  componentWillMount() {
    const { getManyLessons } = this.props
    getManyLessons()
  }

  getLessonsByType = (lessonsById) => {
    const lessonsByType = Object.values(lessonsById).reduce((acc, lesson) => {
      if(lesson.isPublished) {
        acc.published[lesson.order] = lesson
      } else {
        acc.unpublished.push(lesson)
      }
      return acc
    }, { published: [], unpublished: [] })
    return lessonsByType
  }

  onSortEnd = (pos) => {
    const { lessonsById } = this.props
    const oldOrder = pos.oldIndex, newWorldOrder = pos.newIndex
    const lesson = find(Object.values(lessonsById), { order: oldOrder})
    const _id = lesson._id
    if(_id) {
      delete lesson._id
      lesson.id = _id
    }
    this.props.putLesson({
      ...lesson,
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
  const { lessons: { lessonsById } } = state

  return {
    lessonsById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessons: (params) => dispatch(getManyLessons(params))
    , putLesson: (params) => dispatch(putLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageLessons))