import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

import KiwiLink from '../common/KiwiLink'
import { colorOrder, iconOrder } from './assetAssignment'
import { getManyUserProjects, setGlobalColors } from '../actions'
import ProjectCard from './ProjectCard'
import NewProjectCard from './NewProjectCard'

import { sortByLatestUpdated, sortByOldestCreated } from '../utils/timeUtils'

import './overrides.css'

const styles = {
  container: {
    display: 'table'
    , width: '100%'
    , height: '100%'
  },
  rowOne: {
    backgroundColor: '#3E2E61'
    , backgroundImage: 'url(https://res.cloudinary.com/kiwi-stage/image/upload/v1516841083/projects-bg_czy2mq.svg)'
    , backgroundSize: '100%'
    , width: '100%'
    , paddingBottom: '70.67%'
    , position: 'relative'
  },
  header: {
    position: 'absolute'
    , top: '0'
    , left: '0'
    , bottom: '0'
    , right: '0'
  },
  h2: {
    color: '#FFFFFF'
    , position: 'relative'
    , bottom: '0px'
    , marginLeft: '20px'
  },
  projects: {
    position: 'relative'
    , left: '50%'
    , width: '80%'
    , marginLeft: '-40%'
    , marginTop: '-45%'
  },
  rowTwo: {
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-stage/image/upload/v1516844617/projects-bg-tile_gopn6b.svg)'
    , backgroundColor: '#654E93'
    , backgroundSize: '100%'
    , width: '100%'
    , height: '100%'
    , display: 'table-row'
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
    , setGlobalColors: T.func
    , userProjects: T.array
    , userId: T.string.isRequired
  }

  UNSAFE_componentWillMount() {
    this.getUserProjectData()
    this.setUserProjectsByUpdatedAt(this.props.userProjects)
    this.setUserProjectsByCreatedAt(this.props.userProjects)
    this.setColorOrder(this.state.userProjectsByUpdatedAt, this.state.userProjectsByCreatedAt)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.userProjects, nextProps.userProjects)) {
      this.setUserProjectsByUpdatedAt(nextProps.userProjects)
      this.setUserProjectsByCreatedAt(nextProps.userProjects)
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
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

  changeTopBarColor = color => {
    this.props.setGlobalColors({
      primaryColor: color
      , textColor: '#FFFFFF'
      , secondaryColor: color
    })
  }


  render() {
    const { userProjectsByUpdatedAt, colorOrdering } = this.state
    return [
      <div key='1' style={ styles.container }>

        <div style={ styles.rowOne }>
          <div style={ styles.header }>
            <h2 style={ styles.h2 } />
          </div>
        </div>

        <div style={ styles.rowTwo }>
          <div style={ styles.projects }>
            <NewProjectCard className='projectCard' />
            { !isEmpty(userProjectsByUpdatedAt) &&
              userProjectsByUpdatedAt.map((each, i) => {
                const createdAtRanking = colorOrdering[i]
                  , iconName = iconOrder[createdAtRanking % iconOrder.length]
                  , iconColor = colorOrder[createdAtRanking % colorOrder.length]
                return (
                  <ProjectCard
                    className='projectCard'
                    key={ i }
                    project={ each }
                    iconName={ iconName }
                    iconColor={ iconColor }
                    onClick={ () => this.changeTopBarColor(iconColor) }
                  />
                )
              })
            }
          </div>
        </div>

      </div>
    ]
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
    getManyUserProjects: params => dispatch(getManyUserProjects(params))
    , setGlobalColors: params => dispatch(setGlobalColors(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProjects))
