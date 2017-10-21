import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { KiwiLink } from '../common/KiwiLinks'
import { getManyUserProjects } from '../actions'
import UserProjectWidget from './UserProjectWidget'
import LessonCard from './LessonCard'

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
    this.updateCanvas;
  }

  getUserProjectData = () => {
    const { getManyUserProjects } = this.props
    getManyUserProjects()
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillRect(0,0,0,0);
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
            <div id='canvas' width={500} height={500}>
              <h1>Lessons</h1>
              <LessonCard lessonCardData={this.props.lessonCardData}/>
            </div>

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
