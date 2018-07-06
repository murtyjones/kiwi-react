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
  }
})

const SlideHeader = props =>
  <h3 className='studentOnboarding-header'>{ props.text }</h3>

class StudentOnboardingForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    activeSlideIndex: T.number.isRequired
  }

  render() {
    const {
      classes, onSubmit, handleSubmit, formValues, activeSlideIndex
    } = this.props
    const slide = slides[activeSlideIndex]
    const { submitText, Component, FieldComponent, names, name } = slide

    const nameOrNames = {}
    if (names) nameOrNames.names = names
    else nameOrNames.name = name

    const headerProps = {}
    if (slide.headerText) headerProps.text = slide.headerText

    return (
      <form
        className={ classes.form }
        onSubmit={ handleSubmit }
      >
        { !isEmpty(headerProps) &&
          <SlideHeader
            { ...headerProps }
          />
        }
        <FieldComponent
          { ...nameOrNames }
          component={ Component }
          onSubmit={ onSubmit }
        />
        { submitText &&
          <SubmitButton
            text={ submitText }
            { ...this.props }
            onClick={ handleSubmit }
          />
        }
        <ResultMessage
          { ...this.props }
        />
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
    const { password, confirmPassword, providees = [] } = values
    if (!passwordsMatch(password, confirmPassword)) {
      errors.confirmPassword = 'Passwords must match!'
    }
    errors.providees = providees.map((each = {}) => {
      const providerErrors = {}
      if (!passwordsMatch(each.password, each.confirmPassword))
        providerErrors.confirmPassword = 'Passwords must match!'
      return providerErrors
    })
    return errors
  }
})(StudentOnboardingForm)

StudentOnboardingForm = withStyles(styles, { withTheme: true })(StudentOnboardingForm)

export default StudentOnboardingForm
