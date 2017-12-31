import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'

import { RaisedButton } from 'material-ui'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import KiwiToggleField from '../../common/KiwiToggleField'
import { Toggle } from 'redux-form-material-ui'

let formName = 'lessonTheme'

class LessonThemeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  static propTypes = {
    initialValues: T.object
    , slideTypes: T.array
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ { width: "100%", height: "100%" } }>
        <Field
          name={ 'name' }
          hintText={ 'Theme Name' }
          component={ renderTextField }
        />
        <Field
          name={ 'foregroundColor' }
          placeholder={ 'Foreground Color (HEX, e.g. #000000)' }
          component={ renderTextField }
        />
        <Field
          name={ 'backgroundColor' }
          placeholder={ 'Background Color (HEX, e.g. #000000)' }
          component={ renderTextField }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

LessonThemeForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonThemeForm)

export default withRouter(LessonThemeForm)
