import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, find, get } from 'lodash'

import LessonThemeWidget from './LessonThemeWidget'
import { KiwiLink } from '../../common/KiwiLink'
import { getManyLessonThemes, deleteLessonTheme } from '../../actions'


class ManageLessonThemes extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getManyLessonThemes: T.func.isRequired
    , deleteLessonTheme: T.func.isRequired
  }

  componentWillMount() {
    const { getManyLessonThemes } = this.props
    getManyLessonThemes()
  }

  onDelete = (e, id) => {
    e.preventDefault()
    this.props.deleteLessonTheme({id})
  }

  render() {
    const { lessonThemesById } = this.props

    return (
      <div>
        <KiwiLink to={ '/admin/lessons/themes/new' }>
          New Lesson Theme
        </KiwiLink>
        <h5>Lesson Themes</h5>
        { Object.values(lessonThemesById).map((theme, i) => {
          return <LessonThemeWidget key={ i } item={ theme } onDelete={ this.onDelete } />
        }) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lessonThemes: { lessonThemesById } } = state

  return {
    lessonThemesById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyLessonThemes: (params) => dispatch(getManyLessonThemes(params))
    , deleteLessonTheme: (params) => dispatch(deleteLessonTheme(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageLessonThemes))