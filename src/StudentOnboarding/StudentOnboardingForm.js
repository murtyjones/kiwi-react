import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { SubmissionError, reduxForm, getFormValues, unregisterField } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SubmitButton from '../common/form/SubmitButton'
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
    right: '20px',
    bottom: '20px',
    width: '150px',
    borderRadius: '20px',
    backgroundColor: '#654E93',
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
      classes, onSubmit, handleSubmit, formValues, activeSlideIndex, submitFailed, error,
      pristine, submitting, invalid
    } = this.props
    const slide = slides[activeSlideIndex]
    const { submitText, Component, FieldComponent, names, name } = slide

    const submitButtonProps = {
      pristine, submitting, invalid
    }

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
          submitButtonProps={ submitButtonProps }
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
