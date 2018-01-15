import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'
import { RaisedButton, MenuItem } from 'material-ui'
import { Toggle, SelectField } from 'redux-form-material-ui'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'

import Slides from './Slides'

let formName = 'lesson'

const styles = {
  form: {
    width: '100%'
    , height: '100%'
    , padding: '10px'
  }
}

class LessonForm extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  getAllCurrentSlideTypes = () => {
    const { initialValues } = this.props
  }

  static propTypes = {
    initialValues: T.object
    , slideTypes: T.array
  }

  render() {
    const { handleSubmit, submitting, slideTypes, themeOptions } = this.props

    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='title'
          hintText='Title'
          component={ renderTextField }
        />
        <Field
          name='subtitle'
          hintText='Subtitle'
          component={ renderTextField }
        />
        <Field
          name='minutesToComplete'
          hintText='Minutes to Complete'
          label='Minutes to Complete'
          component={ KiwiSliderField }
          defaultValue={ 1 }
          min={ 1 }
          step={ 1 }
          max={ 100 }
        />
        <Field
          name='isPublished'
          label='Is live?'
          component={ Toggle }
        />
        <Field
          name='themeId'
          hintText='Lesson Theme'
          component={ SelectField }
        >
          { themeOptions.map(theme =>
            <MenuItem
              key={ theme._id }
              value={ theme._id }
              primaryText={ theme.name }
            />
          ) }
        </Field>
        <FieldArray
          name="slides"
          component={ Slides }
          selectedSlideTypes={ slideTypes }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

LessonForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonForm)

const selector = formValueSelector(formName)
const mapStateToProps = (state, ownProps) => {
  const slideTypes = selector(state, 'slides')
  const initialValues = ownProps.initialValues
  if(!initialValues.isPublished)
    initialValues.isPublished = false

  return {
    slideTypes
  }
}


export default withRouter(connect(mapStateToProps, null)(LessonForm))
