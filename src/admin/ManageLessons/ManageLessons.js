import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import LessonWidget from './LessonWidget'
import { KiwiLink } from '../../common/KiwiLink'
import { getManyLessons } from '../../actions/index'
import { SortableList } from '../../common/SortableComponents'


class ManageLessons extends Component {
  constructor(props) {
    super(props)
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

  onSortEnd = () => {

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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageLessons))