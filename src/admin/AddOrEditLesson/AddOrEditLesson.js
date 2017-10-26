import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postLesson, putLesson, getLesson } from '../../actions/index'
import { has, isEmpty, isEqual } from 'lodash'
import LessonForm from './LessonFormV2'

class Lesson extends Component {
  constructor(props) {
    super(props)
    const isNewLesson = props.match.path.includes('new')
    const lessonIsLoaded = !isEmpty(props.initialValues)
    this.state = {
      isNewLesson
      , isLoadingLesson: !isNewLesson && !lessonIsLoaded
    }
  }

  static propTypes =  {
    getLesson: T.func.isRequired
    , postLesson: T.func.isRequired
    , putLesson: T.func.isRequired
    , initialValues: T.object.isRequired

  }

  componentWillMount() {
    const { getLesson, match: { params: { id } } } = this.props
    const { isLoadingLesson } = this.state
    if(isLoadingLesson) {
      getLesson({ id })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.setState({ isNewLesson: false, isLoadingLesson: false })
    }
  }

  handleSubmit = (params) => {
    const { postLesson, putLesson } = this.props
    const _id = params._id
    if(_id) {
      delete params._id
      params.id = _id
      return putLesson(params)
    }
    return postLesson(params).then(res => {
      console.log(res)
      this.props.history.push(`/admin/lesson/${res._id}`)
    })
  }

  render() {
    const { initialValues } = this.props
    const { isLoadingLesson, isNewLesson } = this.state
    return (
      <div>
        { isLoadingLesson && isNewLesson
          ? 'loading...'
          :
            <LessonForm
              initialValues={ initialValues }
              onSubmit={ this.handleSubmit }
            />
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { lessons: { lessonsById } } = state
  const { match: { params: { id } } } = ownProps

  return {
    initialValues: lessonsById[id] || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putLesson: (params) => dispatch(putLesson(params))
    , postLesson: (params) => dispatch(postLesson(params))
    , getLesson: (params) => dispatch(getLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lesson))
