import React, { Component } from 'react'
import update from 'immutability-helper';
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValues } from 'redux-form'
import { postLesson, putLesson, getLesson } from '../../actions/index'

//import { RaisedButton } from 'material-ui'
import { List, ListItem, RaisedButton, MenuItem } from 'material-ui'
import { isEqual, isEmpty, find } from 'lodash'

import { slideTypes } from './slideTypes'

import KiwiTextField from '../../common/KiwiTextField'
import KiwiSelectField from '../../common/KiwiSelectField'
import KiwiSliderField from '../../common/KiwiSliderField'

class Slides extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSlideTypes: []
    }
  }

  setSelectedSlideType = (slideIndex, value) => {
    const { selectedSlideTypes } = this.state
    this.setState({
      selectedSlideTypes: update(selectedSlideTypes, { $splice: [[slideIndex, 1, value]] })
    })
  }

  deleteSelectedSlideType = (slideIndex) => {
    const { selectedSlideTypes } = this.state
    this.setState({
      selectedSlideTypes: update(selectedSlideTypes, { $splice: [[slideIndex, 1]] })
    })
  }

  renderSlideConfigure = (value) => {
    const SlideConfigComponent = find(slideTypes, { value }).component
    return <SlideConfigComponent />
  }

  render() {
    const { fields } = this.props
    const { selectedSlideTypes } = this.state
    return (
      <List>
        <ListItem>
          <RaisedButton onClick={ () => fields.push({}) }>
            Add Slide
          </RaisedButton>
        </ListItem>
        { fields.map((eachSlide, i) =>
          <ListItem key={ i }>
            <RaisedButton onClick={ () => {
              this.deleteSelectedSlideType(i)
              fields.remove(i)
            } } >
              Delete slide
            </RaisedButton>
            <h4>Slide #{i + 1}</h4>
            <Field
              name={`${eachSlide}.type`}
              label="Slide Type"
              component={ KiwiSelectField }
              onSelectCustom={ (v) => this.setSelectedSlideType(i, v) }
              options={ slideTypes }
            >
              { slideTypes.map((eachType, i) => {
                return (
                  <MenuItem
                    key={ i }
                    primaryText={eachType.label}
                    value={eachType.value}
                  />
                )
              }) }
            </Field>
            { selectedSlideTypes[i] &&
              this.renderSlideConfigure(selectedSlideTypes[i])
            }
          </ListItem>
        ) }
      </List>
    )
  }
}

class LessonForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  static propTypes = {
    initialValues: T.object
  }

  onDragStop = (v) => {
    this.props.dispatch(change('lesson', 'minutesRequired', v));
  }

  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <form onSubmit={ handleSubmit } style={ { width: "100%", height: "100%" } }>
        <Field
          name={ 'title' }
          label={ 'Title' }
          component={ KiwiTextField }
        />
        <Field
          name={ 'subtitle' }
          label={ 'Subtitle' }
          component={ KiwiTextField }
        />
        <Field
          name={ 'minutesRequired' }
          label={ 'Minutes to Complete' }
          component={ KiwiSliderField }
          defaultValue={ 1 }
          min={ 1 }
          step={ 1 }
          max={ 100 }
          onDragStop={ this.onDragStop }
        />
        <FieldArray name="slides" component={ Slides } />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
      </form>
    )
  }
}

LessonForm = reduxForm({
  form: 'lesson'
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonForm)


export default withRouter(LessonForm)
