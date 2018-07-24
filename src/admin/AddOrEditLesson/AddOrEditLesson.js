import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { postLesson, putLesson, getLesson, getManyVariables, postTestCheckAnswer } from '../../actions'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import LessonForm from './LessonForm'

class AddOrEditLesson extends Component {
  constructor(props) {
    super(props)
    const isNewLesson = props.match.path.includes('new')
    const lessonIsLoaded = !isEmpty(props.initialValues)
    this.state = {
      isNewLesson
      , needsLesson: !isNewLesson && !lessonIsLoaded
    }
  }

  static propTypes =  {
    getLesson: T.func.isRequired
    , postLesson: T.func.isRequired
    , putLesson: T.func.isRequired
    , postTestCheckAnswer: T.func.isRequired
    , initialValues: T.object.isRequired
    , variables: T.array.isRequired

  }

  UNSAFE_componentWillMount() {
    const { getLesson, getManyVariables, match: { params: { id } } } = this.props
    const { needsLesson } = this.state
    if (needsLesson) {
      getLesson({ id })

    }
    getManyVariables()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.setState({ isNewLesson: false, needsLesson: false })
    }
  }

  handleSubmit = (params) => {
    const { postLesson, putLesson } = this.props
    const _id = params._id
    const id = params.id
    if (_id) {
      delete params._id
      params.id = _id
      return putLesson(params)
    } else if (id) {
      return putLesson(params)
    }
    return postLesson(params).then(res => {
      this.props.history.push(`/admin/lessons/${res._id}`)
    })
  }

  render() {
    const { initialValues, variables, postTestCheckAnswer } = this.props
    const { needsLesson, isNewLesson } = this.state

    return (
      <div>
        { needsLesson && isNewLesson
          ? 'loading...'
          :
            <LessonForm
              initialValues={ initialValues }
              onSubmit={ this.handleSubmit }
              postTestCheckAnswer={ postTestCheckAnswer }
              variableOptions={ variables }
            />
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { lessons: { lessonsById }, variables: { variablesById } } = state
  const { match: { params: { id } } } = ownProps
  const variables = Object.values(variablesById)

  return {
    initialValues: lessonsById[id] || {}
    , variables
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putLesson: params => dispatch(putLesson(params))
    , postLesson: params => dispatch(postLesson(params))
    , getLesson: params => dispatch(getLesson(params))
    , postTestCheckAnswer: params => dispatch(postTestCheckAnswer(params))
    , getManyVariables: params => dispatch(getManyVariables(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditLesson))
