import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import KiwiTextField from '../../form/KiwiTextField'
import SubmitButton from '../../../common/form/SubmitButton'
import ResultMessage from '../../../common/form/ResultMessage'

const formName = 'confirmPasswordForm'

const styles = theme => ({
  root: {
    textAlign: 'center'
  }
})

class ConfirmPasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    handleSubmit: T.func.isRequired
  }

  render() {
    const { handleSubmit, classes } = this.props
    return (
      <form className={ classes.root } onSubmit={ handleSubmit }>
        <h3>Confirm your password</h3>
        <Field
          name='password'
          label='Password'
          component={ KiwiTextField }
          type='password'
        />
        <SubmitButton
          text='Confirm Password'
          { ...this.props }
          onClick={ handleSubmit }
        />
        <ResultMessage
          { ...this.props }
        />
      </form>
    )
  }
}

ConfirmPasswordForm = reduxForm({
  form: formName
  , enableReinitialize: true
})(ConfirmPasswordForm)

export default withStyles(styles, { withTheme: true })(ConfirmPasswordForm)
