import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import { SubmissionError, reduxForm, getFormValues, unregisterField } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import cns from 'classnames'

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
    right: 20,
    bottom: 20,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#654E93 !important',
    fontWeight: 'bold',
    border: 'none !important',
    color: '#FFF !important'
  },
  prev: {
    right: 'auto',
    left: 20,
    margin: '20px 0'
  }
})

class StudentOnboardingForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    activeSlideIndex: T.number.isRequired,
    goBack: T.func.isRequired,
  }

  render() {
    const {
      classes, onSubmit, handleSubmit, formValues, activeSlideIndex, submitFailed, error,
      pristine, submitting, invalid
    } = this.props
    const slide = slides[activeSlideIndex]
    const { submitText, canGoBack, Component, FieldComponent, names, name } = slide

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
        { canGoBack &&
          <Button
            variant='flat'
            className={ cns(classes.submit, classes.prev) }
            onClick={ this.props.goBack }
          >
            Go back
          </Button>
        }
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
