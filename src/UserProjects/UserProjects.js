import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'

import { KiwiLink } from '../common/KiwiLink'
import { getManyUserProjects } from '../actions'
import ProjectCard from './ProjectCard'
import NewProjectCard from './NewProjectCard'

const styles = {
  container: {
    backgroundColor: '#3E2E61'
    , backgroundImage: 'url(http://res.cloudinary.com/kiwi-stage/image/upload/v1516586092/projects-bg_jhlo9u.svg)'
    , backgroundSize: '100%'
    , width: '100%'
    , height: '100%'
  },
  header: {
    position: 'absolute'
    , left: '50%'
    , width: '80%'
    , marginLeft: '-40%'
    , top: '0px'
    , height: '300px'
  },
  h2: {
    color: '#FFFFFF'
    , position: 'absolute'
    , bottom: '0px'
    , marginLeft: '20px'
  },
  projects: {
    position: 'absolute'
    , left: '50%'
    , width: '80%'
    , marginLeft: '-40%'
    , top: '300px'
  }
}

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
      <div style={ styles.container }>

        <div style={ styles.header }>
          <h2 style={ styles.h2 }>Recent</h2>
        </div>

        <div style={ styles.projects }>
          <NewProjectCard />
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
