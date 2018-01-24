import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, isEqual, findIndex, cloneDeep } from 'lodash'

import { KiwiLink } from '../common/KiwiLink'
import { getManyUserProjects } from '../actions'
import ProjectCard from './ProjectCard'
import NewProjectCard from './NewProjectCard'

import { sortByLatestUpdated, sortByOldestCreated } from '../utils/timeUtils'

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
    this.state = {
      userProjectsByUpdatedAt: []
      , userProjectsByCreatedAt: []
      , colorOrdering: []
    }
  }

  static propTypes = {
    getManyUserProjects: T.func
    , userProjects: T.array
    , userId: T.string.isRequired
  }

  componentWillMount() {
    this.getUserProjectData()
    this.setUserProjectsByUpdatedAt(this.props.userProjects)
    this.setUserProjectsByCreatedAt(this.props.userProjects)
    this.setColorOrder(this.state.userProjectsByUpdatedAt, this.state.userProjectsByCreatedAt)
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.userProjects, nextProps.userProjects)) {
      this.setUserProjectsByUpdatedAt(nextProps.userProjects)
      this.setUserProjectsByCreatedAt(nextProps.userProjects)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const userProjectsByUpdatedAtHasChanged = !isEqual(this.state.userProjectsByUpdatedAt, nextState.userProjectsByUpdatedAt)
    const userProjectsByCreatedAtHasChanged = !isEqual(this.state.userProjectsByCreatedAt, nextState.userProjectsByCreatedAt)
    const needsColorOrdering = isEmpty(nextState.colorOrdering) && (!isEmpty(nextState.userProjectsByUpdatedAt) && !isEmpty(nextState.userProjectsByCreatedAt))

    if(needsColorOrdering || userProjectsByUpdatedAtHasChanged || userProjectsByCreatedAtHasChanged) {
      this.setColorOrder(nextState.userProjectsByUpdatedAt, nextState.userProjectsByCreatedAt)
    }
  }

  getUserProjectData = () => {
    const { getManyUserProjects, userId } = this.props
    getManyUserProjects({ userId })
  }

  setUserProjectsByUpdatedAt = userProjects =>
    this.setState({ userProjectsByUpdatedAt: sortByLatestUpdated(cloneDeep(userProjects)) })

  setUserProjectsByCreatedAt = userProjects =>
    this.setState({ userProjectsByCreatedAt: sortByOldestCreated(cloneDeep(userProjects)) })

  setColorOrder = (userProjectsByUpdatedAt, userProjectsByCreatedAt) => {
    const colorOrdering = userProjectsByUpdatedAt.reduce((acc, each) => {
      const order = findIndex(userProjectsByCreatedAt, { _id: each._id })
      acc.push(order)
      return acc
    }, [])
    this.setState({ colorOrdering })
  }


  render() {
    const { userProjectsByUpdatedAt, colorOrdering } = this.state
    return (
      <div style={ styles.container }>

        <div style={ styles.header }>
          <h2 style={ styles.h2 }>Recent</h2>
        </div>

        <div style={ styles.projects }>
          <NewProjectCard />
          { !isEmpty(userProjectsByUpdatedAt) && userProjectsByUpdatedAt
            .map((each, i) =>
              <ProjectCard
                key={ i }
                project={ each }
                colorPos={ colorOrdering[i] }
              />
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
    userProjects: Object.values(userProjectsById) || []
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyUserProjects: (params) => dispatch(getManyUserProjects(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProjects))
