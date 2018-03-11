import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postLessonTheme, putLessonTheme, getLessonTheme } from '../../actions'
import { has, isEmpty, isEqual, cloneDeep } from 'lodash'
import LessonThemeForm from './LessonThemeForm'

class AddOrEditLessonTheme extends Component {
  constructor(props) {
    super(props)
    const isNewLessonTheme = props.match.path.includes('new')
    const lessonThemeIsLoaded = !isEmpty(props.initialValues)
    this.state = {
      isNewLessonTheme
      , needsLessonTheme: !isNewLessonTheme && !lessonThemeIsLoaded
    }
  }

  static propTypes =  {
    getLessonTheme: T.func.isRequired
    , postLessonTheme: T.func.isRequired
    , putLessonTheme: T.func.isRequired
    , initialValues: T.object.isRequired

  }

  componentWillMount() {
    const { getLessonTheme, match: { params: { id } } } = this.props
    const { needsLessonTheme } = this.state
    if(needsLessonTheme) {
      getLessonTheme({ id })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.setState({ isNewLessonTheme: false, needsLessonTheme: false })
    }
  }

  handleSubmit = (params) => {
    const { postLessonTheme, putLessonTheme } = this.props
    const _id = params._id
    const id = params.id
    if(_id) {
      delete params._id
      params.id = _id
      return putLessonTheme(params)
    } else if(id) {
      return putLessonTheme(params)
    }
    return postLessonTheme(params).then(res => {
      this.props.history.push(`/admin/lessons/themes/${res._id}`)
    })
  }

  render() {
    const { initialValues } = this.props
    const { needsLessonTheme, isNewLessonTheme } = this.state
    return (
      <div>
        { needsLessonTheme && isNewLessonTheme
          ? 'loading...'
          :
          <LessonThemeForm
            initialValues={ initialValues }
            onSubmit={ this.handleSubmit }
          />
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { lessonThemes: { lessonThemesById } } = state
  const { match: { params: { id } } } = ownProps
  const lessonTheme = lessonThemesById[id] || {}
  const initialValues = cloneDeep(lessonTheme)

  if(initialValues.assets && initialValues.assets.length) {
    initialValues.assets.forEach((e, i) => {
      if(!e.x) initialValues.assets[i].x = 0
      if(!e.y) initialValues.assets[i].y = 0
    })
  }

  return {
    initialValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putLessonTheme: params => dispatch(putLessonTheme(params))
    , postLessonTheme: params => dispatch(postLessonTheme(params))
    , getLessonTheme: params => dispatch(getLessonTheme(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditLessonTheme))
