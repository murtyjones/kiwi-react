import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { getManyLessons } from '../../actions/index'
import LessonWidget from './LessonWidget'

import { KiwiLink } from '../../common/KiwiLink'


class ManageLessons extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getManyLessons } = this.props
    getManyLessons()
  }


  render() {
    const { lessonsById } = this.props
    return (
      <div>
        <KiwiLink to={ '/admin/lesson/new' }>
          New Lesson
        </KiwiLink>
        { !isEmpty(lessonsById) &&
          Object.values(lessonsById)
          .map((lesson, i) =>
            <LessonWidget key={ i } lesson={ lesson } />
          )
        }
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