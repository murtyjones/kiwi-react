import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { getManyUserProjects } from '../actions'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getManyUserProjects: T.func
    , userProjects: T.object
  }

  componentWillMount() {
    this.getUserProjectData()
  }

  getUserProjectData = () => {
    const { getManyUserProjects } = this.props
    getManyUserProjects()
  }

  render() {
    const { userProjects } = this.props
    return (
      <div>
        { !isEmpty(userProjects) && Object.values(userProjects).map(each => { return <div>{ each.code }</div> }) }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { userProjects: { projectsById } } = state

  return {
    userProjects: projectsById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyUserProjects: (params) => dispatch(getManyUserProjects(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))