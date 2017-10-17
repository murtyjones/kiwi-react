import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, isEqual } from 'lodash'

import { getUserProject, putUserProject, postUserProject } from '../actions'

import renderIf from 'render-if'

import CodeEditor from '../CodeEditor/CodeEditor'



class UserProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newProject: (props.location.pathname === "/project/new"),
      projectTitle: '',
      projectId: (props.location.pathname === "/project/new") ? null : props.match.params.id
    }
  }

  static propTypes = {
    userProject: T.object.isRequired
    , getUserProject: T.func.isRequired
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

  //the reason that this is necessary is that if you hit enter with the projectId
  // in the url bar it will attempt to render the page before the props are passed
  // back from the redux controller. It *should* flow through to the state, but then
  // you still have the problem of the "type here to start coding" boilerplate flashing
  // in with your previous code When redux finally pops in. Instead, I caused the page to take longer to load. --Peter
  // componentWillUpdate(nextProps, nextState) {
  //   const { userProjectStatus, newProject } = this.state
  //   if (userProjectStatus === "empty" && !newProject && !isEmpty(nextProps.userProject)) {
  //     this.setState({ userProjectStatus: "full" })
  //   }
  // }

  //Here are the handlers for the code. These are callback hooks
  // into CodeEditor but all the primary logic should remain here.
  // Comment any changes you make in CodeEditor and make them minimal (hooks only!).
  // Consider abstracting the handlers to their own files in this folder if they get too big. --Peter

  //Save issue:

  //We need to decide on what are the exact model objects we pass around
  //There are inconsistencies
  //For example,compare

  // value of results from getUserProject in UserProjectController:  [ { _id: '59e505d3e7edfa0205542c09',
  //   userId: '59d65fda4926671d474a9ea4',
  //   code: 'print \'hello world\'',
  //   title: 'hello peter' } ]

  //vs whitelist in models/UserProject.js
  // let whitelist = {
  //   code: true
  //   , title: true
  //   , description: true
  //   , updatedAt: true
  // }

  //ive included code and title so that the basic functionality will work.
  // It asks the user what they want to name their project if it is not a new project,
  // but currently there is no functonality for changing the name of a project that already exists.
  // This is somewhat dependent on how we design the UI. --Peter

  saveHandler(code) {
    console.log()
    const { newProject, projectTitle } = this.state
    const id = newProject ? null : this.state.projectId
    if(newProject) {
      this.props.postUserProject({ code, title: projectTitle }).then(res => {
        this.props.history.push(`/project/${res._id}`)
      })
    } else {
      this.props.putUserProject({ id, code, title: projectTitle })
    }
  }


  //these are some functions that require a better formatted editor. UI/UX will inform logic handling.--peter
  logOutHandler(){

  }

  deleteProjectHandler(){

  }

  //Here we may want to let them navigate back to other pages, but we should
  // consider what logic allows the user to remain on the same page but just
  // load a different project for example (do we navigate back to the dashboard for all of those or not?)
  navigationHandler(){

  }

  render() {
    const { userProject, userProject: { _id } } = this.props
    const { newProject } = this.state
    const isNewOrHasCode = newProject || (!newProject && !!userProject.code)
    return (
      <div>
        <input
          type="text"
          placeholder="pick your title!"
          onChange={ (e) => this.setState({ projectTitle: e.target.value }) }
        />
        { renderIf(isNewOrHasCode)(
          <CodeEditor
            codeInput={ newProject ? { code: null } : userProject }
            newProject = { newProject }
            saveHandler={ this.saveHandler.bind(this) }
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
