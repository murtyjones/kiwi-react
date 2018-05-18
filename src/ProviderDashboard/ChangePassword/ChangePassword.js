import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import ChangePasswordForm from './ChangePasswordForm'
import { changePassword } from '../../actions'

import './overrides.css'

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      submitted: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired,
    changePassword: T.func.isRequired
  }

  handleSubmit = async (params) => {
    try {
      const result = await this.props.changePassword(params)
      if(result.success) {
        throw { message: 'Could not be done right now. Please try again later.' }
      }
    } catch(err) {
      if(err.message && err.message.error && err.message.error.invalid_grant) {
        throw new SubmissionError({ _error: 'Wrong password!' })
      }
      throw new SubmissionError({ _error: err.message })
    }
  }

  render() {
    const { initialValues } = this.props
    return (
      <ChangePasswordForm
        initialValues={ initialValues }
        onSubmit={ this.handleSubmit }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, profiles: { profilesById } } = state
  const profile = profilesById[userId] || {}
  return {
    initialValues: profile,
    userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: params => dispatch(changePassword(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword))