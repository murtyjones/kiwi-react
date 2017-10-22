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
      alertText: "Submit",
      alerted: false
    }
  }

  componentDidMount(){
    this.props.getManyLessons()
    setTimeout(()=>{console.log("this.props.lessonsById ", this.props.lessonsById)},5000)
  }

  componentWillReceiveProps(nextProps){
    // if(nextProps.lessonsById!=this.props.lessonsById){
      console.log('this.props.lessonsById', this.props.lessonsById);
    // }
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
    // console.log("Inside handleTextChange before setState");
    // console.log('value of lessonName ', lessonName);
    // console.log('value of lessonDescription ', lessonDescription);
    this.setState({
      lessonName: lessonName||this.state.lessonName,
      lessonDescription: lessonDescription||this.state.lessonDescription
    }, ()=>{
      // console.log("Inside handleTextChange after setState");
      // console.log('value of lessonName ', this.state.lessonName);
      // console.log('value of lessonDescription ', this.state.lessonDescription);
      // console.log('value of alertText ', this.state.alertText);
      // console.log('value of alerted ', this.state.alerted);
      if (this.state.alerted===true){
        if (this.state.alertText==="Both Lesson Name and Lesson Description are Blank! OH NOES!" && this.state.lessonName!=null & this.state.lessonDescription!=null){
          // console.log('inside 1)');
          this.setState({
            alerted: false,
            alertText: "Submit"
          })
        }
        if (this.state.alertText==="Lesson Name is Blank! OH NOES!"&&this.state.lessonName!=null){
          // console.log('inside 2)');
          this.setState({
            alerted: false,
            alertText: "Submit"
          })
        }
        if(this.state.alertText==="Lesson Description is Blank! OH NOES!"&&this.state.lessonDescription!=null){
          // console.log('inside 3)');
          this.setState({
            alerted: false,
            alertText: "Submit"
          })
        }
      }
    })
  }

  handleModalClose(){
    if(this.state.lessonName!=null && this.state.lessonDescription!=null){
      let lessonName = this.state.lessonName
      this.setState({
        lessonName: null
      })
      //on
      this.props.postLesson({code: null, title: this.state.lessonName, description: this.state.lessonDescription})
      this.setState({
        newModalOpen: false
      })
    }else{
      if(this.state.lessonName===null && this.state.lessonDescription===null){
        this.setState({
          alertText: "Both Lesson Name and Lesson Description are Blank! OH NOES!",
          alerted: true
        })
      }else if(this.state.lessonName===null){
        this.setState({
          alertText: "Lesson Name is Blank! OH NOES!",
          alerted: true
        })
      }else if(this.state.lessonDescription===null){
        this.setState({
          alertText: "Lesson Description is Blank! OH NOES!",
          alerted: true
        })
      }
    }
  }

  //need to make a map of all lessons after pulling from redux on componentDidMount

  render() {
    // console.log('this.props.lessonsById', this.props.lessonsById);
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
              onChange={(e)=>{this.handleTextChange(e.target.value, null)}}
          /><br/>
          <TextField
               hintText="Lesson Description"
               onChange={(e)=>{this.handleTextChange(null, e.target.value)}}
          /><br/>
       </Dialog>
        <div id='canvas' width={500} height={500}>
          <h1>Lessons</h1>
          <LessonCard lessonCardData={this.props.lessonCardData} handleLessonClick={()=>{this.handleLessonClick()}}/>
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
