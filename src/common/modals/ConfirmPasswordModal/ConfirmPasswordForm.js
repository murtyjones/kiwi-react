import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import KiwiTextField from '../../form/KiwiTextField'
import SubmitButton from '../../../common/form/SubmitButton'
import ResultMessage from '../../../common/form/ResultMessage'
import {required} from "../../../utils/validationUtils";

const formName = 'confirmPasswordForm'

const styles = theme => ({
  root: {
    padding: 15,
    textAlign: '-webkit-center'
  }
})

class ConfirmPasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    classes: T.object.isRequired,
    handleSubmit: T.func.isRequired,
    preConfirmMessage: T.any
  }

  render() {
    const { handleSubmit, preConfirmMessage, classes } = this.props
    return (
      <form className={ classes.root } onSubmit={ handleSubmit }>
        { preConfirmMessage }
        <Field
          name='password'
          label='Password'
          component={ KiwiTextField }
          type='password'
          validate={ [ required ] }
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
