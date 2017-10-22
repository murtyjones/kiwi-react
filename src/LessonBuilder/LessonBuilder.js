import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../actions'

//Material ui stuf
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import LessonCard from './LessonCard'
import TextField from 'material-ui/TextField'
import Header from './Header'
import renderIf from 'render-if'
import { isEmpty } from 'lodash'
import { getManyLessons, postLesson } from '../actions'


class LessonBuilder extends Component {
  constructor(props) {
    super(props)

    this.state={
      open: false,
      lessonclicked: false,
      clickedId: null,
      newModalOpen: false,
      lessonName: null,
      lessonDescription: null,
      openAlert: false,
      alertText: "Please fill out lesson name and description.",
      alerted: false,
      lessonsById: null
    }
  }

  componentDidMount(){
    this.props.getManyLessons()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.lessonsById!=this.props.lessonsById){

      let temparray = [];

      Object.keys(nextProps.lessonsById).forEach(lesson=>{
        temparray.push(nextProps.lessonsById[lesson])
      })

      console.log("temparray: ", temparray)
      this.setState({
        lessonsById: temparray
      })
    }
  }

  handleLessonClick(lessonId){
    console.log('inside handleLessonClick!');
    this.setState({
      lessonclicked: true
    })
  }

  openNewModal(){
    this.setState({
      newModalOpen: true
    })
  }

  handleAlertClose(){
    this.setState({
      openAlert:false
    })
  }

  handleTextChange(lessonName, lessonDescription){
    this.setState({
      lessonName: lessonName,
      lessonDescription: lessonDescription
    }, ()=>{

      console.log('value of this.state.lessonName: ', this.state.lessonName);
      console.log('value of this.state.lessonDescription: ', this.state.lessonDescription);

      if(!isEmpty(this.state.lessonName)&&!isEmpty(this.state.lessonDescription)){
        this.setState({
          alertText: "Submit"
        })
      }
      if(this.state.lessonName===null||this.state.lessonName===""&&this.state.lessonDescription===null||this.state.lessonDescription===""){
        this.setState({
          alertText: "Please fill out lesson name and description."
        })
      }

      if((this.state.lessonName===null||this.state.lessonName==="")&&(this.state.lessonDescription!=null&&this.state.lessonDescription!="")){
        this.setState({
          alertText: "Please fill out lesson name."
        })
      }

      if((this.state.lessonDescription===null||this.state.lessonDescription==="")&&(this.state.lessonName!=null&&this.state.lessonName!="")){
        this.setState({
          alertText: "Please fill out description."
        })
      }
    })
  }

  handleModalClose(){
    console.log('this.state.alerted: ', this.state.alerted);
    if(this.state.alertText==="Submit"){
      let lessonName = this.state.lessonName
      this.setState({
        lessonName: null
      })
      //on
      this.props.postLesson({code: null, title: this.state.lessonName, description: this.state.lessonDescription})
      this.setState({
        newModalOpen: false
      })
    }
  }

  render() {
    let LessonList;
    if (!isEmpty(this.state.lessonsById)===true){
      LessonList = this.state.lessonsById.map((lesson,i)=>{
        return(
          <LessonCard key={i} lesson={lesson}/>
        )
      })
    }


    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={()=>this.handleModalClose()}
     />,
     <FlatButton
       label={this.state.alertText}
       primary={true}
       keyboardFocused={true}
       onClick={()=>this.handleModalClose()}
     />,
   ];

    return (
      <div>
        <Header isLoggedIn={this.props.isLoggedIn}/>
        <FlatButton primary={true} onClick={()=>{this.openNewModal()}}>Create New Lessson</FlatButton>
        <br/><br/>
        <Dialog
         title="Create New Lesson!"
         actions={actions}
         modal={false}
         open={this.state.newModalOpen}
         onRequestClose={()=>this.handleModalClose()}
       >
         Creat a New Lesson. Make sure to give it a title and description!<br/><br/>
         <TextField
              hintText="Lesson Title"
              onChange={(e)=>{this.handleTextChange(e.target.value, this.state.lessonDescription)}}
          /><br/>
          <TextField
              hintText="Lesson Description"
              onChange={(e)=>{this.handleTextChange(this.state.lessonName, e.target.value)}}
          /><br/>
       </Dialog>
        <div id='canvas' width={500} height={500}>
          <h1>Lessons</h1>
          {LessonList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state
  const { lessons: { lessonsById } } = state
  return {
    isLoggedIn,
    lessonsById,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout()),
    getManyLessons: () => dispatch(getManyLessons()),
    postLesson: (params) => dispatch(postLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonBuilder))
