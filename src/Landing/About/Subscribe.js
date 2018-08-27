import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Email from '@material-ui/icons/Email'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import KiwiTextField from '../../common/form/KiwiTextField'
import { email, required } from '../../utils/validationUtils'
import SubmitButton from '../../common/form/SubmitButton'
import ApiFetch from '../../utils/ApiFetch'
import config from 'config'
import ResultMessage from '../../common/form/ResultMessage'

const styles = () => ({
  root: {
    margin: '0 auto 20px auto',
    maxWidth: 700,
    width: '75%'
  },
  form: {
    margin: '0 auto',
    maxWidth: 300
  },
  h1: {
    fontSize: 'calc(25px + 0.7vw)'
    , margin: '3vh 5vw'
    , color: '#624F8F'
    , textAlign: 'center'
    , WebkitTextAlign: 'center'
  }
})

class SubscribeForm extends Component {
  constructor(props) {
    super()
  }

  static propTypes = {
    handleSubmit: T.func.isRequired,
    classes: T.object.isRequired,
  }

  render() {
    const { handleSubmit, classes } = this.props
    return (
      <div className={ classes.root }>
        <form className={ classes.form } onSubmit={ handleSubmit }>
          <Field
            name='email'
            label='Email'
            component={ KiwiTextField }
            StartAdornmentIcon={ Email }
            validate={ [ email, required ] }
          />
          <SubmitButton
            text='Subscribe'
            { ...this.props }
          />
          <ResultMessage
            { ...this.props }
            successMessage='Subscribed!'
          />
        </form>
      </div>
    )
  }
}

SubscribeForm = reduxForm({
  form: 'subscribe', enableReinitialize: true
})(SubscribeForm)

class Subscribe extends Component {
  constructor(props) {
    super()
  }

  static propTypes = {
    classes: T.object.isRequired
  }

  handleSubmit = async ({ email }) => {
    try {
      const r = await ApiFetch(`${config.api}/mailchimp/subscribe`, {
        method: 'POST',
        body: { email }
      })
    } catch (err) {
      throw new SubmissionError({ _error: err.body ? err.body.message : err.message })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <h1 className={ classes.h1 }>Subscribe To Kiwi's Newsletter</h1>
        <SubscribeForm
          classes={ classes }
          onSubmit={ this.handleSubmit }
        />
      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Subscribe)