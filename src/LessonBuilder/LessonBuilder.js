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
import { getManyLessons, postLesson, deleteLesson, putLesson } from '../actions'
import LessonPlanner from "./LessonPlanner"
import LessonForm from './LessonForm'
import Checkbox from 'material-ui/Checkbox'
// import { Values } from 'redux-form-website-template';


const styles ={
  container: {
    width: "100%",
    height: "100%",
  }
}

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
      lessonsById: null,
      lessonprops: null,
      checked: false
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

      console.log("temparray in componentWillReceiveProps lessonsbyid: ", temparray)
      this.setState({
        lessonsById: temparray
      })
    }
  }

  handleLessonBack(){
    this.setState({
      lessonclicked: false,
      lessonprops: null
    })
  }

  handleLessonDelete(lessonId){
    console.log('inside handleLessonDelete!');
    console.log('value of lesson id: ', lessonId);
    this.props.deleteLesson({ id: lessonId })
  }

  handleLessonClick(lessonprops){
    console.log('inside handleLessonClick!');
    console.log('value of lessonprops: ', lessonprops);
    this.setState({
      lessonclicked: true,
      lessonprops: lessonprops
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
      this.props.postLesson({title: this.state.lessonName, description: this.state.lessonDescription, pages: null, pageTypes: null})
      this.setState({
        newModalOpen: false
      })
    }
  }

  handleLessonFormSubmit = async(v) => {
    console.log('inside handleLessonFormSubmit');
    console.log('value of v: ', v);
    if (!isEmpty(v.renderPages)&&!isEmpty(v.pagesButtons)){
      console.log('value of renderPages: ', v.renderPages);
      console.log('value of renderButtons: ', v.pagesButtons);
      try {
        const success = await this.props.putLesson({id:this.state.lessonprops._id, title: this.state.lessonprops.title, description: this.state.lessonDescription, pages: v.renderPages, pageTypes: v.pagesButtons})
        this.props.getManyLessons()
        console.log('in handlesubmit try');
      } catch(e) {
        console.log('in handlesubmit catch');
        console.log('value of e:', e);
      }
    }
  }

  render() {
    console.log("inside render and value of this.state.lessonsById is: ", this.state.lessonsById)
    let LessonList;
    if (!isEmpty(this.state.lessonsById)===true){
      LessonList = this.state.lessonsById.map((lesson,i)=>{
        return(
          <LessonCard key={i} lesson={lesson}
          handleLessonDelete={(e)=>this.handleLessonDelete(e)} handleLessonClick={(e)=>this.handleLessonClick(e)}/>
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
      <div style={styles.container}>
        <Header isLoggedIn={this.props.isLoggedIn}/>
        {renderIf(this.state.lessonclicked===false)(
          <div>
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
        )}
        {renderIf(this.state.lessonclicked===true)(
          <div>
            <LessonForm
            lessons={this.state.lessonprops}
            onSubmit={this.handleLessonFormSubmit}
            handleLessonBack={()=>this.handleLessonBack()}/>
          </div>
        )}
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
    deleteLesson: (params) => dispatch(deleteLesson(params)),
    postLesson: (params) => dispatch(postLesson(params)),
    putLesson: (params) => dispatch(putLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonBuilder))
