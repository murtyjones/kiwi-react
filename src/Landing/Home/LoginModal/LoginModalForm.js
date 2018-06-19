import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as T from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { reduxForm, getFormValues, unregisterField } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SubmitButton from '../../../common/form/SubmitButton'
import ResultMessage from '../../../common/form/ResultMessage'
import { passwordsMatch } from '../../../utils/validationUtils'

const styles = theme => ({
  form: {
    height: '100%'
  },
  row1: {
    height: '60px',
    overflow: 'auto'
  },
  row2: {
    height: 'calc(100% - 60px)'
  },
  control: {
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    height: '100%',
    boxShadow: 'none'
  },
})

let formName = 'loginModal'

const SlideHeader = props =>
  <h3 className='loginModalForm-header'>{ props.text }</h3>

class LoginModalForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired
    , goToNextSlide: T.func.isRequired
  }

  render() {
    const { classes, handleSubmit, onSubmit, slide, formValues } = this.props
    const { submitText, Component, FieldComponent, names, name } = slide

    const nameOrNames = {}
    if (names) nameOrNames.names = names
    else nameOrNames.name = name

    const headerProps = {}
    if (slide.headerText) headerProps.text = slide.headerText
    else headerProps.text = slide.headerTextMaker(formValues)

    return (
      <Paper className={ classes.control }>
        <form className={ classes.form } onSubmit={ handleSubmit }>
          <div className={ classes.row1 }>
            <SlideHeader { ...headerProps } />
          </div>
          <div className={ classes.row2 }>
            <FieldComponent
              { ...nameOrNames }
              component={ Component }
              goToPrevSlide={ this.props.goToPrevSlide }
              formValues={ formValues }
              onSubmit={ onSubmit }
            />
            { submitText &&
              <SubmitButton
                text={ submitText }
                { ...this.props }
                onClick={ handleSubmit }
              />
            }
            <ResultMessage { ...this.props } />
          </div>
        </form>
      </Paper>
    )
  }
}


LoginModalForm = connect(
  state => ({
    formValues: getFormValues(formName)(state)
  })
)(LoginModalForm)

LoginModalForm = reduxForm({
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
})(LoginModalForm)

LoginModalForm = withStyles(styles, { withTheme: true })(LoginModalForm)

export default LoginModalForm
