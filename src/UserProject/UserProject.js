import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, isEqual, get } from 'lodash'

import { getUserProject, putUserProject, postUserProject } from '../actions'
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
      newProject: (props.location.pathname === "/project/new"),
      projectTitle: get(props, 'userProject.title', ''),
      projectId: (props.location.pathname === "/project/new") ? null : props.match.params.id
    }
  }

  static propTypes = {
    userProject: T.object.isRequired
    , getUserProject: T.func.isRequired
    , putUserProject: T.func.isRequired
    , postUserProject: T.func.isRequired
  }

  componentWillMount() {
    const { getUserProject, userProject, location: { pathname }, match: { params: { id } } } = this.props
    const { newProject } = this.state

    if(!newProject && isEmpty(userProject)) {
      getUserProject({ id })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.userProject, nextProps.userProject)) {
      this.setState({
        projectId: nextProps.userProject._id
        , newProject: false
        , projectTitle: nextProps.userProject.title
      })
    }
  }


  saveHandler = (code) => {
    const { postUserProject, putUserProject } = this.props
    const { newProject, projectTitle } = this.state
    const id = newProject ? null : this.state.projectId
    if(newProject) {
      postUserProject({ code, title: projectTitle }).then(res => {
        this.props.history.push(`/project/${res._id}`)
      })
    } else {
      putUserProject({ id, code, title: projectTitle })
    }
  }


  render() {
    const { userProject, userProject: { _id } } = this.props
    const { newProject, projectTitle } = this.state
    const isNewOrHasCode = newProject || (!newProject && !!userProject.code)
    return (
      <div>
        <TextField
          placeholder="pick your title!"
          value={ projectTitle }
          onChange={ (e) => this.setState({ projectTitle: e.target.value }) }
        />
        { renderIf(isNewOrHasCode)(
          <CodeEditor
            className='lessonFullSizeEditor'
            layoutType={ LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR }
            saveHandler={ this.saveHandler.bind(this) }
            editorStyle={ codeEditorStyles }
            editorInput={ userProject.code ? userProject.code: '' }
          />
        ) }

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { userProjects: { projectsById } } = state
  const { match: { params: { id } } } = ownProps

  return {
    userProject: projectsById[id] || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProject: (params) => dispatch(getUserProject(params))
    , putUserProject: (params) => dispatch(putUserProject(params))
    , postUserProject: (params) => dispatch(postUserProject(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProject))
