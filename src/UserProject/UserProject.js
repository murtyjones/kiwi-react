import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { getUserProject, putUserProject, postUserProject } from '../actions'

import renderIf from 'render-if'

import CodeEditor from '../CodeEditor/CodeEditor'


//Somehow MuiThemeProvider is getting lost on the way to rendering the components for routes - this is strange, however I *think* its due to Link {Router} from the Dashboard stripping it. Not sure how to resolve other than to redeclare --Peter

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { kiwiGreen, kiwiLightGreen, kiwiPurple, kiwiLightPurple,
  kiwiDarkBlue, kiwiLightRed, kiwiWhite, kiwiYellow, kiwiTurq,
  kiwiOrange, kiwiLightBlue, kiwiDarkGreen } from '../colors';


const main_theme = getMuiTheme({
  palette: {
    primary1Color: kiwiGreen,
    primary2Color: kiwiLightPurple,
    accent1Color: kiwiPurple,
    accent2Color: kiwiLightGreen,
    textColor: kiwiLightPurple,
    alternateTextColor: kiwiLightPurple,
    canvasColor: kiwiPurple
  }
});

const alt_theme1 = getMuiTheme({
  palette: {
    primary1Color: kiwiDarkBlue,
    primary2Color: kiwiWhite,
    accent1Color: kiwiYellow,
    accent2Color: kiwiYellow,
    textColor: "#ffffff",
    alternateTextColor: "#ffffff",
    canvasColor: kiwiYellow
  }
});

const alt_theme2 = getMuiTheme({
  palette: {
    primary1Color: kiwiTurq,
    primary2Color: kiwiOrange,
    accent1Color: kiwiOrange,
    accent2Color: kiwiDarkGreen,
    textColor: kiwiLightBlue,
    alternateTextColor: kiwiLightBlue,
    canvasColor:  kiwiOrange
  }
});

class UserProject extends Component {
  constructor(props) {
    super(props)
    this.state={
      newproject: null,
      themeValue: 1,
      theme: main_theme,
      id: null,
      userprojectstatus: "empty"
    }
  }

  static propTypes = {
    userProject: T.object.isRequired
    , getUserProject: T.func.isRequired
  }

  componentWillMount() {
    const { getUserProject, userProject, match: { params: { id } } } = this.props
    if (this.props.location.pathname==="/project/new"){
      console.log('value of this.props: ', this.props);
      this.setState({
        newproject: true
      })
    }else{
      this.setState({
        newproject: false
      })
    }

    if(isEmpty(userProject) && this.props.location.pathname!="/project/new"){
      this.props.getUserProject({ id })
      console.log('value of this.props: ', this.props);
      console.log('value of userProject: ', this.props.userProject);
      this.setState({
        userprojectstatus: "empty"
      })
    }else{
      this.setState({
        userprojectstatus: "full"
      })
    }
  }

  //the reason that this is necessary is that if you hit enter with the projectId in the url bar it will attempt to render the page before the props are passed back from the redux controller. It *should* flow through to the state, but then you still have the problem of the "type here to start coding" boilerplate flashing in with your previous code When redux finally pops in. Instead, I caused the page to take longer to load. --Peter
  componentWillUpdate(nextProps, nextState) {
    if (this.state.userprojectstatus==="empty" && this.state.newproject===false && !isEmpty(nextProps.userProject)){
      this.setState({
        userprojectstatus: "full"
      })
    }
  }

  //Here are the handlers for the code. These are callback hooks into CodeEditor but all the primary logic should remain here. Comment any changes you make in CodeEditor and make them minimal (hooks only!). Consider abstracting the handlers to their own files in this folder if they get too big. --Peter

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

  //ive included code and title so that the basic functionality will work. It asks the user what they want to name their project if it is not a new project, but currently there is no functonality for changing the name of a project that already exists. This is somewhat dependent on how we design the UI. --Peter

  saveHandler(code, title){
    //put for altering previous project, post for creating a new project --peter
    let description = "placeholder for now"
    let updatedAt = Date.now() //How do we want this formatted? --peter
    if (this.state.newproject === true){
      this.props.postUserProject({code, title, description, updatedAt})
    }else{
      let title = localStorage.getItem("projectTitle")
      localStorage.removeItem('projectTitle')
       //find better way latter --peter
      this.props.putUserProject({code, title, description, updatedAt})
    }
    //may want a popup or something that notifies user that the project was saved --peter
  }


  //these are some functions that require a better formatted editor. UI/UX will inform logic handling.--peter
  logOutHandler(){

  }

  deleteProjectHandler(){

  }

  //Here we may want to let them navigate back to other pages, but we should consider what logic allows the user to remain on the same page but just load a different project for example (do we navigate back to the dashboard for all of those or not?)
  navigationHandler(){

  }

  render() {
    const { userProject: { _id } } = this.props
    return (
      <div>
        {renderIf(this.state.userprojectstatus==="full")(
          <div>
          {renderIf(this.state.newproject===false)(
            <MuiThemeProvider muiTheme={this.state.theme}>
              <CodeEditor CodeInput={this.props.userProject}
              newproject={this.state.newproject} saveHandler={this.saveHandler.bind(this)}/>
            </MuiThemeProvider>
          )}
          {renderIf(this.state.newproject===true)(
            <MuiThemeProvider muiTheme={this.state.theme}>
              <CodeEditor CodeInput={{code: null}}
              newproject = {this.state.newproject} saveHandler={this.saveHandler.bind(this)}/>
            </MuiThemeProvider>
          )}
          </div>
        )}
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
    getUserProject: (params) => dispatch(getUserProject(params)),
    putUserProject: (params) =>
    dispatch(putUserProject(params)),
    postUserProject: (params) =>
    dispatch(postUserProject(params)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProject))
