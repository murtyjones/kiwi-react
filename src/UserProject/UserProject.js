import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import renderIf from 'render-if'
import { GLOBAL_COLORS } from '../constants'

import { getUserProject, putUserProject, postUserProject, setTopBarTitle, toggleTopBarTitleFocus, setGlobalColors } from '../actions'
import CodeEditor from '../CodeEditor/CodeEditor'
import withTopBarTitle from '../hocs/withTopBarTitle'


const styles = {
  container: {
    height: '100%'
    , width: '100%'
    , overflow: 'auto'
    , position: 'absolute'
    , top: '0px'
  }
}

class UserProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewProject: !props.match.params.id
      , projectId: !!props.match.params.id ? props.match.params.id : null
      , color: get(props, 'location.state.color', '')
    }
  }

  static propTypes = {
    userProject: T.object.isRequired
    , getUserProject: T.func.isRequired
    , putUserProject: T.func.isRequired
    , postUserProject: T.func.isRequired
    , setTopBarTitle: T.func.isRequired
    , toggleTopBarTitleFocus: T.func.isRequired
  }

  UNSAFE_componentWillMount() {
    const { toggleTopBarTitleFocus, setTopBarTitle, getUserProject, userProject, match: { params: { id } } } = this.props
    const { isNewProject } = this.state

    if (!isNewProject && isEmpty(userProject)) {
      getUserProject({ id })
    }

    toggleTopBarTitleFocus(true)

    const title = isEmpty(userProject) || !userProject.title
      ? 'name me!'
      : userProject.title

    setTopBarTitle(title)

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.userProject, nextProps.userProject)) {
      nextProps.setTopBarTitle(get(nextProps, 'userProject.title', ''))
      this.setState({
        projectId: nextProps.userProject._id
        , isNewProject: false
      })
      nextProps.setTopBarTitle(nextProps.userProject.title)
    }
  }

  componentWillUnmount() {
    this.props.setGlobalColors(GLOBAL_COLORS.default)
  }


  handleSave = (code) => {
    const { postUserProject, putUserProject, userProject, userId, topBarTitle } = this.props
    const { isNewProject } = this.state

    const id = isNewProject ? null : this.state.projectId
      , title = topBarTitle

    if (isNewProject) {
      postUserProject({ code, title, userId })
      .then(res => {
        this.props.history.push(`/project/${res._id}`)
      })
    } else {
      putUserProject({ ...userProject, id, code, title, userId })
    }
  }


  render() {
    const { userProject, userProject: { _id } } = this.props
    const { isNewProject, color } = this.state
    const isNewOrHasCode = isNewProject || (!isNewProject && !!userProject.code)

    return (
      <div style={ styles.container }>
        { renderIf(isNewOrHasCode)(
          <CodeEditor
            className='lessonFullSizeEditor'
            editorInput={ userProject.code ? userProject.code: '' }
            onSave={ this.handleSave }
          />
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, userProjects: { userProjectsById }, topBar: { topBarTitle } } = state
  const { match: { params: { id } } } = ownProps

  return {
    userProject: userProjectsById[id] || {}
    , topBarTitle
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProject: params => dispatch(getUserProject(params))
    , putUserProject: params => dispatch(putUserProject(params))
    , postUserProject: params => dispatch(postUserProject(params))
    , setTopBarTitle: title => dispatch(setTopBarTitle(title))
    , toggleTopBarTitleFocus: (isFocused) => dispatch(toggleTopBarTitleFocus(isFocused))
    , setGlobalColors: params => dispatch(setGlobalColors(params))
  }
}

UserProject = withTopBarTitle(UserProject, {
  title: 'name me!', topBarTitleDisabled: false, showLogo: false
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProject))
