import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { login } from '../../../actions'
import ConfirmPasswordForm from './ConfirmPasswordForm'
import { getError } from '../../../utils/httpErrorUtils'


class ConfirmPasswordModal extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    callback: T.func.isRequired,
    login: T.func.isRequired,
    username: T.string.isRequired
  }

  handleSubmit = async v => {
    const { login, username, callback } = this.props
    try {
      const r = await login({ username, password: v.password })
      return callback(true)
    } catch (err) {
      if(JSON.stringify(err).includes('invalid_grant')) {
        throw new SubmissionError({ password: '', _error: 'Wrong password.' })
      }
      throw new SubmissionError({ password: '', _error: getError(err) })
    }
  }

  render() {
    return (
      <ConfirmPasswordForm
        onSubmit={ this.handleSubmit }
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { auth: { username } } = state

  return { username }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: params => dispatch(login(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordModal)
