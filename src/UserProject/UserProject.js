import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { getUserProject } from '../actions'

class UserProject extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getUserProject, userProject, match: { params: { id } } } = this.props
    if(isEmpty(userProject)) {
      getUserProject({ id })
    }
  }

  static propTypes = {
    userProject: T.object.isRequired
    , getUserProject: T.func.isRequired
  }

  render() {
    const { userProject: { _id } } = this.props
    return (
      <div>
        { _id }
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
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProject))