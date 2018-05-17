import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ResetPasswordForm from './ResetPasswordForm'
import { getProfile, updateProfile } from '../../actions'

import './overrides.css'

class ResetPassword extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired,
    updateProfile: T.func.isRequired,
    getProfile: T.func.isRequired,
  }

  componentWillMount() {
    const { userId, getProfile } = this.props
    getProfile({ userId })
  }

  handleSubmit = async (params) => {
    console.log(params)

  }

  render() {
    const { initialValues } = this.props

    return (
      <ResetPasswordForm
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
    updateProfile: params => dispatch(updateProfile(params))
    , getProfile: params => dispatch(getProfile(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword))