
import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { signout } from '../actions'
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form'

//Material ui stuf
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import RadioButton from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import LessonCard from './LessonCard'
import Header from './Header'
import renderIf from 'render-if'
import { getManyLessons, postLesson } from '../actions'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField'

import styled from 'styled-components';
import glamorous from 'glamorous';
import { css } from 'glamor';

import { isEmpty } from 'lodash'
import { connect } from 'react-redux'

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'

const GridBigContainer = glamorous.div(
  {
    display: "grid",
    gridTemplateColumns: "20vw 40vw 40vw",
    gridTemplateRows: "10vh 40vh 40vh",
    gridGap: "0vw",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "grey"
  }
)

// const LessonLeft = styled.div`
//   grid-column: 2/3;
//   grid-row: 1/4;
//   position: relative;
//   background-color: orange;
// `
// const LessonRight = styled.div`
//   grid-column: 3 / 4;
//   grid-row: 1 / 4;
//   background-color: red;
// `

const FlexRow = styled.div`
  display: Flex;
  flex-direction: row
`

const Flex1 = styled.div`
  display: Flex;
  Flex: 1;
`

const LessonLeft = styled.div`
  position: absolute;
  left: 10%;
  top: 0%;
  width: 40%;
  height: 100%;
  z-Index: 1;
`
const LessonRight = styled.div`
  position: absolute;
  right: 10%;
  top: 0%;
  width: 40%;
  height: 100%;
  z-Index: 1;
`

const LessonTopRight = glamorous.div(
  {
    gridColumn: "2/3",
    gridRow: "3/4",
    position: "relative",
    backgroundColor: "purple"
  }
)

const LessonTopLeft = glamorous.div(
  {
    gridColumn: "2/3",
    gridRow: "2/3",
    position: "relative",
    backgroundColor: "purple"
  }
)

const LessonBottomRight = glamorous.div(
  {
    gridColumn: "3/4",
    gridRow: "3/4",
    position: "relative",
    backgroundColor: "purple"
  }
)

const LessonBottomLeft = glamorous.div(
  {
    gridColumn: "2/3",
    gridRow: "3/4",
    position: "relative",
    backgroundColor: "purple"
  }
)

const AskBox = glamorous.div(
  {
    gridColumn: "1/2",
    gridRow: "1/4",
    position: "relative",
    backgroundColor: "purple"
  }
)
const ContentBox = glamorous.div(
  {
    gridColumn: "2/4",
    gridRow: "1/4",
    position: "relative",
    backgroundColor: "black"
  }
)

// const LessonRight = glamorous.div(
//   {
//     gridColumn: "3/4",
//     gridRow: "2/4",
//     position: "relative",
//     backgroundColor: "red"
//   }
// )
//
// const LessonLeft = glamorous.div(
//   {
//     gridColumn: "2/3",
//     gridRow: "2/4",
//     position: "relative",
//     backgroundColor: "orange"
//   }
// )



const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  question: {
    float: 'right'
  },
  dialog: {
    display: 'inline-block',
    height: '150px',
    width: '50%'
  },
  AddPageStyle:{
    position: "absolute",
    left: "5%",
    top: "20%"
  },
  InstructionStyle: {
    position: "absolute",
    width: "90%",
    height: "90%",
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: "white"
  },
  codeInputBig: {
    position: "absolute",
    width: "100%",
    height: "85%",
    marginTop: "15%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    // marginRight: "10%",
    // marginRight: "20%",
    // marginLeft: "20%",
    // marginBottom: "20%",
    background: "white",
    textAlign: 'center'
    // background: "repeating-linear-gradient(45deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px)"
  },
  codeInputSmallTop:{
    width: "100%",
    height: "42.5%",
    marginTop: "15%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    // marginRight: "10%",
    // marginRight: "20%",
    // marginLeft: "20%",
    // marginBottom: "20%",
    background: "white",
    textAlign: 'center'
    // background: "repeating-linear-gradient(45deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px)"
  },
  codeOutputSmallBottom:{
    width: "100%",
    height: "42.5%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    // marginRight: "10%",
    // marginRight: "20%",
    // marginLeft: "20%",
    // marginBottom: "20%",
    background: "gray",
    textAlign: 'center'
    // background: "repeating-linear-gradient(45deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px)"
  },
  codeOutputBig: {
    position: "absolute",
    width: "100%",
    height: "85%",
    marginTop: "15%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    // marginLeft: "10%",
    // marginRight: "20%",
    // marginLeft: "20%",
    // marginBottom: "20%",
    background: "gray",
    textAlign: 'center'
    // background: "repeating-linear-gradient(45deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px),repeating-linear-gradient(135deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px)"
  },
  instructionsBig: {
    position: "absolute",
    width: "100%",
    height: "85%",
    marginTop: "15%",
    marginBottom: "0%",
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    // marginLeft: "10%",
    // marginRight: "20%",
    // marginLeft: "20%",
    // marginBottom: "20%",
    background: "white",
    textAlign: 'center'
    // background: "repeating-linear-gradient(45deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px),repeating-linear-gradient(135deg,rgba(0,0,0,1),rgba(100,100,100,1) 10px,rgba(100,100,100,1) 10px,rgba(100,100,100,1) 20px)"
  },
  colortrial: {
    backgroundColor: 'white'
  },
  welcomePaper: {
    position: 'absolute',
    borderWidth:"2px",
    borderColor:"black",
    borderStyle:"solid",
    width: "80%",
    height: "80%",
    left: "10%",
    top: "10%",
    paddingTop: '10%',
    textAlign: 'center'
  }
};

//ISSUES


// https://github.com/erikras/redux-form/issues/3553
// Issues with getting radio and checkboxes to work in Chrome
// Examples from the documentation dont appear to work in this environment, (but do on Safari/Firefox)
// https://github.com/kriasoft/react-starter-kit/issues/1358 has had the same issue - it may be browserSync
// -Peter

//Changes to material-ui buttons is slow - it may be because of the code, or it could be because we have to go to redux
//and come back as the redux-form fields update. I'm not sure --Peter.


//QUESTIONS

//Are we going to end up using markdown and if so will the markdown parser work with both redux form and material ui?

//If we don't end up using checkboxes or radiobuttons because of bugs, what should we use instead?

//TO-Do
//hook up the connect to redux to get the lessons in progress from the database
//question: does this look good before I do that? What changes are going to occur in the node database from changing how admin is evaluated?



class LessonForm extends Component {
  constructor(props) {
    super(props)

    this.state={
      radioVal: "allcode",
      radioArray: [],
      radioIndex: 0,
      modifyattributes: [],
      removefield: null,
      showExtended: false
    }
  }

  addButtonHandler(){
    this.setState({
      addbuttonclicked: true
    }, ()=>{
      let tempradioarray = this.state.radioArray
      let tempmodifyattributes = this.state.modifyattributes
      tempradioarray.push(this.state.radioVal)
      tempmodifyattributes.push(false)
      this.setState({
        radioArray: tempradioarray,
        modifyattributes: tempmodifyattributes,
        radioVal: "allcode",
        canSetInsert: true
      }, ()=>{
        this.props.change(`Radio${this.state.radioArray.length}button`, 'allcode');
      })
    })
  }

  modifyAttributesButton(pagenum){
    let tempmodifyattributes = this.state.modifyattributes
    tempmodifyattributes[pagenum] = !tempmodifyattributes[pagenum]
    this.setState({
      modifyattributes: tempmodifyattributes
    })
  }

  modifyAttributesRadio(pagenum, value){
    let tempradioarray = this.state.radioArray
    tempradioarray[pagenum] = value
    this.setState({
      radioArray: tempradioarray
    })
  }

  componentDidMount(){
    this.props.change(`Radio0button`, 'allcode');
    console.log('value of this.props.lesson: ', this.props.lessons);
  }

  componentWillUpdate(){
    console.log('value of this.state: ', this.state);
  }

  handleRemoveField(pagenum){
    let tempradioarray = this.state.radioArray
    tempradioarray.splice(pagenum, 1);
    this.setState({
      radioArray: tempradioarray,
      removefield: pagenum
    })
  }


  render() {

    const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
      <TextField hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    )

    const ModifyAttributesToolbar = ({pagenum}) => {
      return(
        <div style={{position: "absolute", zIndex: "2", width: "100%"}}>
          {renderIf(!this.state.modifyattributes[pagenum])(
            <Toolbar>
              <ToolbarGroup>
                <Subheader>
                  Page Number: {pagenum+1}
                </Subheader>
              </ToolbarGroup>
              <ToolbarGroup>
                <RaisedButton secondary={true} onClick={()=>{this.handleRemoveField(pagenum)}}>
                  Delete
                </RaisedButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <RaisedButton primary={true} onClick={()=>{this.modifyAttributesButton(pagenum)}}>
                  Modify Attributes
                </RaisedButton>
              </ToolbarGroup>
            </Toolbar>
          )}
          {renderIf(this.state.modifyattributes[pagenum])(
            <Toolbar>
              <ToolbarGroup>
                <Subheader>
                  Page Number: {pagenum+1}
                </Subheader>
              </ToolbarGroup>
              <ToolbarGroup>
                <RaisedButton secondary={true} onClick={()=>{this.handleRemoveField(pagenum)}}>
                  Delete
                </RaisedButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <RaisedButton primary={true} onClick={()=>{this.modifyAttributesButton(pagenum)}}>
                  Hide Attributes
                </RaisedButton>
              </ToolbarGroup>
                <ToolbarGroup>
                  <Field name={`Radio${pagenum}button`} component={RadioButtonGroup} style={{ display: 'flex', width: '150%' }}>
                    <RadioButton value="allcode" label="Code" onClick={()=>{this.modifyAttributesRadio(pagenum, "allcode")}}/>
                    <RadioButton value="allinstructions" label="Instructions" onClick={()=>{this.modifyAttributesRadio(pagenum, "allinstructions")}}/>
                    <RadioButton value="halfandhalf" label="Half and Half" onClick={()=>{this.modifyAttributesRadio(pagenum, "halfandhalf")}}/>
                  </Field>
                </ToolbarGroup>
            </Toolbar>
          )}
        </div>
      )
    }

    const pagesButtons = ({fields})=>{
      if (this.state.canSetInsert===true){
        let radiostr = `Radio${this.state.radioArray.length}button`
        console.log('radiostr: ', radiostr);
        console.log('value of radioArray: ', this.state.radioArray);
        fields.insert(this.state.radioArray.length-1, this.state.radioArray[this.state.radioArray.length-1])
        this.setState({
          canSetInsert: false
        })
      }
      if (this.state.removefield!=null){
        fields.remove(this.state.removefield)
        this.setState({
          removefield: null
        })
      }
      return(null)
    }

    const renderPages = ({ fields }) => {
      console.log('value of addbuttonclick::: ', this.state.addbuttonclicked);
      if (this.state.addbuttonclicked===true){
        fields.push({})
        this.setState({
          addbuttonclicked: false,
        })
      }
      if (this.state.removefield!=null){
        fields.remove(this.state.removefield)
        this.setState({
          removefield: null
        })
      }
      return(
        <div style={{width: "100%", height: "100%", backgroundColor: "gray"}}>
          <FieldArray name="pagesButtons" component={pagesButtons}/>
          {fields.map((renderPages, pagenum) =>
            <div key={pagenum} style={{width: "100%", height: "100%", backgroundColor: "skyblue", position: 'relative'}}>
              <ModifyAttributesToolbar pagenum={pagenum}/>
              {renderIf(this.state.radioArray[pagenum]==="allcode")(
                <div>
                  <LessonLeft>
                    <Paper zDepth={2} style={styles.codeInputBig}>
                      <div style={{textAlign: "center", marginTop:"40%", color: "black"}}>
                        <h1>
                          Kids Code Goes Here!
                        </h1>
                      </div>
                    </Paper>
                  </LessonLeft>
                  <LessonRight>
                    <Paper zDepth={2} style={styles.codeOutputBig}>
                      <div style={{textAlign: "center", marginTop:"40%", color: "white"}}>
                        <h1>
                          Kids Output Goes Here!
                        </h1>
                      </div>
                    </Paper>
                  </LessonRight>
                </div>
              )}
              {renderIf(this.state.radioArray[pagenum]==="allinstructions")(
                <div>
                  <LessonLeft>
                    <Paper zDepth={2} style={styles.instructionsBig}>
                      <div style={{textAlign: "center", marginTop:"0%", color: "black", maxHeight: "100%", overflow:"hidden", overflowY: "scroll"}}>
                        <Field name={`${renderPages}.textFullPageInstructionsLeft`} component={renderTextField} label="Write some instructions here!" multiLine={true} rows={5} style={{fontSize: "2vh", width: "80%"}}/>
                      </div>
                    </Paper>
                  </LessonLeft>
                  <LessonRight>
                    <Paper zDepth={2} style={styles.instructionsBig}>
                      <div style={{textAlign: "center", marginTop:"0%", color: "black", maxHeight: "100%", overflow:"hidden", overflowY: "scroll"}}>
                        <Field name={`${renderPages}.textFullPageInstructionsRight`} component={renderTextField} label="Write some instructions here!" multiLine={true} rows={5} style={{fontSize: "2vh", width: "80%"}}/>
                      </div>
                    </Paper>
                  </LessonRight>
                </div>
              )}
              {renderIf(this.state.radioArray[pagenum]==="halfandhalf")(
                <div>
                  <LessonLeft>
                    <Paper zDepth={2} style={styles.instructionsBig}>
                      <div style={{textAlign: "center", marginTop:"0%", color: "black", maxHeight: "100%", overflow:"hidden", overflowY: "scroll"}}>
                        <Field name={`${renderPages}.textHalfPageInstructionsLeft`} component={renderTextField} label="Write some instructions here!" multiLine={true} rows={5} style={{fontSize: "2vh", width: "80%"}}/>
                      </div>
                    </Paper>
                  </LessonLeft>
                  <LessonRight>
                    <Paper zDepth={2} style={styles.codeInputSmallTop}>
                      <div style={{textAlign: "center", marginTop:"20%", color: "black"}}>
                        <h1>
                          Kids Input Goes Here!
                        </h1>
                      </div>
                    </Paper>
                    <Paper zDepth={2} style={styles.codeOutputSmallBottom}>
                      <div style={{textAlign: "center", marginTop:"20%", color: "white"}}>
                        <h1>
                          Kids Output Goes Here!
                        </h1>
                      </div>
                    </Paper>
                  </LessonRight>
                </div>
              )}
            </div>
          )}
        </div>
      )
    }

    // onSubmit={handleSubmit}

    const { error, handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{width: "100%", height: "100%"}}>
        <GridBigContainer>
          <AskBox>
            <Field name={`Radio${this.state.radioArray.length}button`} component={RadioButtonGroup}>
              <RadioButton value="allcode" label="All Code" onClick={()=>{this.setState({radioVal: "allcode"})}}/>
              <RadioButton value="allinstructions" label="All Instructions" onClick={()=>{this.setState({radioVal: "allinstructions"})}}/>
              <RadioButton value="halfandhalf" label="Half and Half" onClick={()=>{this.setState({radioVal: "halfandhalf"})}}/>
            </Field>
            <RaisedButton primary={true} onClick={()=>{this.addButtonHandler()}}> Add Page </RaisedButton>
            <RaisedButton type="submit" onClick={handleSubmit} disabled={submitting}>
              Save Lesson!
            </RaisedButton>
          </AskBox>
          <ContentBox style={{overflow: "hidden", overflowY: "scroll"}} >
            {renderIf(this.state.radioArray.length===0)(
                <div style={{width: "100%", height: "100%", backgroundColor: "skyblue", position: 'relative'}}>
                  <Paper zDepth={2} style={styles.welcomePaper}>
                    <h1>
                      Hi and welcome to the lesson builder
                    </h1>
                    <br/>
                    <h2>
                      Click on the buttons on the left to begin
                    </h2>
                  </Paper>
                </div>
            )}
            {renderIf(this.state.radioArray.length>0)(
              <FieldArray name="renderPages" component={renderPages}/>
            )}
          </ContentBox>
        </GridBigContainer>
      </form>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',
  // validate
  //  initialValues:initialValuesObject,
  //  enableReinitialize: true
})(LessonForm)


// InitializeFromStateForm = connect(
//   state => ({
//     initialValues: state.account.data // pull initial values from account reducer
//   }),
//   { load: loadAccount } // bind account loading action creator
// )(InitializeFromStateForm)
//
// export default InitializeFromStateForm
