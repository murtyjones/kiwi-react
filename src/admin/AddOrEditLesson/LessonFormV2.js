import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change } from 'redux-form'

import { RaisedButton } from 'material-ui'

import KiwiTextField from '../../common/KiwiTextField'
import KiwiSliderField from '../../common/KiwiSliderField'
import Slides from './Slides'

let formName = 'lesson'

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
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonForm)


export default withRouter(LessonForm)
