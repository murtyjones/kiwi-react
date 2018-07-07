import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { SubmissionError, reduxForm, getFormValues, unregisterField } from 'redux-form'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import isEmpty from 'lodash/isEmpty'

import SubmitButton from '../common/form/SubmitButton'
import ProgressBar from '../common/ProgressBar/ProgressBar'
import ResultMessage from '../common/form/ResultMessage'
import { passwordsMatch } from '../utils/validationUtils'
import slides from './slides'

let formName = 'studentOnboarding'

const styles = theme => ({
  form: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  submit: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    borderRadius: '20px',
    backgroundColor: '#AED15D',
    fontWeight: 'bold',
    border: 'none !important',
    color: '#FFF !important'
  }
})

class StudentOnboardingForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    activeSlideIndex: T.number.isRequired
  }

  render() {
    const {
      classes, onSubmit, handleSubmit, formValues, activeSlideIndex, submitFailed, error
    } = this.props
    const slide = slides[activeSlideIndex]
    const { submitText, Component, FieldComponent, names, name } = slide

    const nameOrNames = {}
    if (names) nameOrNames.names = names
    else nameOrNames.name = name
    return (
      <form
        className={ classes.form }
        onSubmit={ handleSubmit }
      >
        <FieldComponent
          { ...nameOrNames }
          component={ Component }
          onSubmit={ onSubmit }
          handleSubmit={ handleSubmit }
          hasSubmitFailed={ submitFailed }
          error={ error }
        />
        { submitText &&
          <SubmitButton
            className={ classes.submit }
            text={ submitText }
            { ...this.props }
            disabledOverride={ true }
            onClick={ handleSubmit }
          />
        }
        { submitText &&
          <ResultMessage
            { ...this.props}
          />
        }
      </form>
    )
  }
}


StudentOnboardingForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(StudentOnboardingForm)

StudentOnboardingForm = reduxForm({
  form: formName
  , destroyOnUnmount: false
  , forceUnregisterOnUnmount: true
  , enableReinitialize: true
  , onSubmitSuccess: (result, dispatch) =>
    dispatch(unregisterField(formName, 'submitSucceeded'))
  , validate: values => {
    const errors = {}
    const { newPassword, confirmPassword, providees = [] } = values
    if (!passwordsMatch(newPassword, confirmPassword)) {
      errors.confirmPassword = 'Passwords must match!'
    }
    return errors
  }
})(StudentOnboardingForm)

StudentOnboardingForm = withStyles(styles, { withTheme: true })(StudentOnboardingForm)

export default StudentOnboardingForm
