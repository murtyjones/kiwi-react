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
import { getManyLessons, postLesson, deleteLesson, putLesson, getLesson} from '../actions'
import LessonPlanner from "./LessonPlanner"
import LessonForm from '../admin/AddOrEditLesson/LessonFormV2'
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
      lessonClicked: false,
      clickedId: null,
      newModalOpen: false,
      lessonName: null,
      lessonDescription: null,
      openAlert: false,
      alertText: "Please fill out lesson name and description.",
      alerted: false,
      lessonsById: null,
      selectedLesson: 0,
      checked: false
    }
  }

  static propTypes = {
    lessonsById: T.object
  }

  componentDidMount(){
    this.props.getManyLessons()
  }

  handleLessonBack(){
    this.setState({
      lessonClicked: false,
      selectedLesson: null
    })
  }

  handleLessonDelete(lessonId){
    console.log('inside handleLessonDelete!');
    console.log('value of lesson id: ', lessonId);
    this.props.deleteLesson({ id: lessonId })
  }

  handleLessonClick(selectedLesson) {
    this.props.history.push(`/admin/lesson/${selectedLesson._id}`)
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
    if (!isEmpty(v.renderPages) && !isEmpty(v.pagesButtons)) {
      console.log('value of renderPages: ', v.renderPages);
      console.log('value of renderButtons: ', v.pagesButtons);
      try {
        const success = await this.props.putLesson({id:this.state.selectedLesson._id, title: this.state.selectedLesson.title, description: this.state.lessonDescription, pages: v.renderPages, pageTypes: v.pagesButtons})
        this.props.getManyLessons()
        console.log('in handlesubmit try');
      } catch(e) {
        console.log('in handlesubmit catch');
        console.log('value of e:', e);
      }
    }
  }

  render() {
    const lessonsArray = Object.values(this.props.lessonsById)
    const selectedLessonId = (this.state.selectedLesson) ? this.state.selectedLesson._id : null
    const { lessonClicked, selectedLesson } = this.state

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
        { renderIf(this.state.lessonClicked===false)(
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
              Create a New Lesson. Make sure to give it a title and description!<br/><br/>
              <TextField
                hintText="Lesson Title"
                onChange={ (e)=>{ this.handleTextChange(e.target.value, this.state.lessonDescription) } }
              />
              <br/>
              <TextField
                hintText="Lesson Description"
                onChange={ (e)=>{ this.handleTextChange(this.state.lessonName, e.target.value) } }
              />
              <br/>
           </Dialog>
            <div id='canvas' width={500} height={500}>
              <h1>Lessons</h1>
              { lessonsArray.map((lesson, i) =>
                <LessonCard
                  key={ i }
                  lesson={ lesson }
                  handleLessonDelete={ (e) => this.handleLessonDelete(e) }
                  handleLessonClick={ (e) => this.handleLessonClick(e) }
                />
              ) }
            </div>
          </div>
        ) }
        { renderIf(!isEmpty(this.props.lessonsById[selectedLessonId]) && lessonClicked && selectedLesson !== 0)(
          <div>
            <LessonForm
              initialValues={ this.props.lessonsById[selectedLessonId] }
              onSubmit={ this.handleLessonFormSubmit }
              handleLessonBack={ ()=>this.handleLessonBack() } />
          </div>
        ) }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { auth: { isLoggedIn } } = state
  const { lessons: { lessonsById = {} } } = state
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
    putLesson: (params) => dispatch(putLesson(params)),
    getLesson: (params) => dispatch(getLesson(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonBuilder))
