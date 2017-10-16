import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { getUserProject } from '../actions'

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

    if(isEmpty(userProject)){
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

  //the reason that this is necessary is that if you hit enter with the projectId in the
  //url bar it will attempt to render the page before the props are passed back from the redux
  //controller. It *should* flow through to the state, but then you still have the problem
  //of the "type here to start coding" boilerplate flashing in with your previous code When
  //redux finally pops in. Instead, I caused the page to take longer to load. --Peter
  componentWillUpdate(nextProps, nextState) {
    if (this.state.userprojectstatus==="empty" && !isEmpty(nextProps.userProject)){
      this.setState({
        userprojectstatus: "full"
      })
    }
  }

  render() {
    const { userProject: { _id } } = this.props
    return (
      <div>
        {renderIf(this.state.userprojectstatus==="full")(
          <div>
          {renderIf(this.state.newproject===false)(
            <MuiThemeProvider muiTheme={this.state.theme}>
              <CodeEditor CodeInput={this.props.userProject}/>
            </MuiThemeProvider>
          )}
          {renderIf(this.state.newproject===true)(
            <MuiThemeProvider muiTheme={this.state.theme}>
              <CodeEditor CodeInput={null}/>
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
    getUserProject: (params) => dispatch(getUserProject(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProject))
