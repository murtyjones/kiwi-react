import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { KiwiLink } from '../common/KiwiLinks'
import { getManyUserProjects } from '../actions'

import UserProjectWidget from './UserProjectWidget'

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

  newProjectHandler(){
    console.log('inside newProjectHandler in Dashboard');
  }

  render() {
    const { userProjects } = this.props

    return (
      <div>
        <div>
          Previous saved projects...
        </div>
        <div>
          { !isEmpty(userProjects) && Object.values(userProjects)
            .map(each =>
              <UserProjectWidget project={ each }/>
            )
          }
        </div>
        <br/>
        <div>
            ...or create a new project...
        </div>
        <br/>
        <KiwiLink to={ `/project/new` }>New Project</KiwiLink>
        <br/>
          {/*Lesson stucture will go here*/}
        <br/>
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
