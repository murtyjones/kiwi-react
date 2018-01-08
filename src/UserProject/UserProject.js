import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, isEqual, get } from 'lodash'

import { getUserProject, putUserProject, postUserProject, setTopBarTitle, toggleTopBarTitleIsDisabled, toggleTopBarTitleFocus } from '../actions'
import { TextField } from 'material-ui'

import renderIf from 'render-if'

import { LESSON_SLIDE_TYPES } from '../constants'

import CodeEditor from '../CodeEditorV2/CodeEditorV2'

const codeEditorStyles = {
  editorInputContainerStyle: {
    width: '50%'
    , display: 'inline-block'
  },
  editorOutputContainerStyle: {
    width: '50%'
    , display: 'inline-block'
  },
  editorContainerStyle: {
    display: 'flex'
    , minHeight: '600px'
  },
  editorOutputStyle: {
    border: '1px solid #CCC'
    , borderLeft: 0
    , borderTopRightRadius: '10px'
    , borderBottomRightRadius: '10px'
  }
}

class UserProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewProject: (props.location.pathname === "/project/new"),
      projectId: (props.location.pathname === "/project/new") ? null : props.match.params.id
    }
  }

  static propTypes = {
    userProject: T.object.isRequired
    , getUserProject: T.func.isRequired
    , putUserProject: T.func.isRequired
    , postUserProject: T.func.isRequired
    , setTopBarTitle: T.func.isRequired
    , toggleTopBarTitleFocus: T.func.isRequired
    , toggleTopBarTitleIsDisabled: T.func.isRequired
  }

  componentWillMount() {
    const { toggleTopBarTitleIsDisabled, toggleTopBarTitleFocus, setTopBarTitle, getUserProject, userProject, match: { params: { id } } } = this.props
    const { isNewProject } = this.state

    if(!isNewProject && isEmpty(userProject)) {
      getUserProject({ id })
    }

    toggleTopBarTitleIsDisabled(false)
    toggleTopBarTitleFocus(true)
    setTopBarTitle('name me!')

  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.userProject, nextProps.userProject)) {
      nextProps.setTopBarTitle(get(nextProps, 'userProject.title', ''))
      this.setState({
        projectId: nextProps.userProject._id
        , isNewProject: false
      })
      nextProps.setTopBarTitle(nextProps.userProject.title)
    }
  }


  handleSave = (code) => {
    const { postUserProject, putUserProject, userProject, topBarTitle } = this.props
    const { isNewProject } = this.state

    const id = isNewProject ? null : this.state.projectId
      , title = topBarTitle

    if(isNewProject) {
      postUserProject({ code, title })
      .then(res => {
        this.props.history.push(`/project/${res._id}`)
      })
    } else {
      putUserProject({ ...userProject, id, code, title })
    }
  }


  render() {
    const { userProject, userProject: { _id } } = this.props
    const { isNewProject } = this.state
    const isNewOrHasCode = isNewProject || (!isNewProject && !!userProject.code)

    return (
      <div>
        { renderIf(isNewOrHasCode)(
          <CodeEditor
            className='lessonFullSizeEditor'
            layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
            onSave={ this.handleSave }
            editorStyle={ codeEditorStyles }
            editorInput={ userProject.code ? userProject.code: '' }
          />
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { userProjects: { userProjectsById }, topBar: { topBarTitle } } = state
  const { match: { params: { id } } } = ownProps

  return {
    userProject: userProjectsById[id] || {}
    , topBarTitle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProject: (params) => dispatch(getUserProject(params))
    , putUserProject: (params) => dispatch(putUserProject(params))
    , postUserProject: (params) => dispatch(postUserProject(params))
    , setTopBarTitle: (title) => dispatch(setTopBarTitle(title))
    , toggleTopBarTitleFocus: (isFocused) => dispatch(toggleTopBarTitleFocus(isFocused))
    , toggleTopBarTitleIsDisabled: (isDisabled) => dispatch(toggleTopBarTitleIsDisabled(isDisabled))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProject))
