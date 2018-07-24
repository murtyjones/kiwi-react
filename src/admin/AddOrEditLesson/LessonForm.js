import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { Toggle } from 'redux-form-material-ui'

import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import KiwiSliderField from '../../common/renderSliderField'
import Slides from './Slides'
import KiwiTextField from '../../common/form/KiwiTextField'

let formName = 'lesson'

const styles = {
  form: {
    width: 'calc(100% - 20px)' // 20px padding offset
    , height: '100%'
    , padding: '10px'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  }
}

class LessonForm extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , allSlideValues: T.array
    , variableOptions: T.array.isRequired
    , postTestCheckAnswer: T.func.isRequired
  }

  render() {
    const {
      handleSubmit, allSlideValues, variableOptions, postTestCheckAnswer
    } = this.props

    return (
      <form onSubmit={ handleSubmit } style={ styles.form }>
        <Field
          name='title'
          label='Title'
          component={ KiwiTextField }
        />
        <Field
          name='subtitle'
          label='Subtitle'
          component={ KiwiTextField }
        />
        <Field
          name='imageUrl'
          label='Image URL'
          component={ KiwiTextField }
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
        <FieldArray
          name='slides'
          component={ Slides }
          allSlideValues={ allSlideValues }
          postTestCheckAnswer={ postTestCheckAnswer }
          variableOptions={ variableOptions }
        />
        <SubmitButton
          text='Save'
          { ...this.props }
          onClick={ handleSubmit }
        />
        <ResultMessage
          { ...this.props }
          successMessage='Saved!'
        />
      </form>
    )
  }
}

LessonForm = reduxForm({
  form: formName
  , enableReinitialize: true
})(LessonForm)

const selector = formValueSelector(formName)
const mapStateToProps = (state, ownProps) => {
  const allSlideValues = selector(state, 'slides')
  const initialValues = ownProps.initialValues
  if (!initialValues.isPublished)
    initialValues.isPublished = false

  return {
    allSlideValues
  }
}


export default withRouter(connect(mapStateToProps, null)(LessonForm))
