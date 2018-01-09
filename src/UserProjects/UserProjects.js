import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { KiwiLink } from '../common/KiwiLink'
import { getManyUserProjects } from '../actions'
import ProjectCard from './ProjectCard'

class UserProjects extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getManyUserProjects: T.func
    , userProjects: T.object
    , userId: T.string.isRequired
  }

  componentWillMount() {
    this.getUserProjectData()
  }

  getUserProjectData = () => {
    const { getManyUserProjects, userId } = this.props
    getManyUserProjects({ userId })
  }


  render() {
    const { userProjects } = this.props
    return (
      <div>
        <br/>
        <div>
            Create a new project...
        </div>
        <br/>
        <KiwiLink to={ `/project/new` }>New Project</KiwiLink>
        <br/>
        <br/>
          <hr />
          <div>
            Previous saved projects...
          </div>
          <div>
            { !isEmpty(userProjects) && Object.values(userProjects)
              .map((each, i) =>
                <ProjectCard key={ i } project={ each } />
              )
            }
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { userProjects: { userProjectsById }, auth: { userId } } = state

  return {
    userProjects: userProjectsById
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyUserProjects: (params) => dispatch(getManyUserProjects(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProjects))
