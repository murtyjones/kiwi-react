import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmpty, isEqual } from 'lodash'

import ProfileForm from './ProfileForm'
import { updateProfile } from '../../actions'

import './overrides.css'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    initialValues: T.object.isRequired,
    updateProfile: T.func.isRequired,
  }

  handleSubmit = async (v) => {
    const { userId, updateProfile } = this.props
    const params = {
      ...v,
      _id: userId
    }
    return updateProfile(params)
  }

  render() {
    const { initialValues } = this.props

    return (
      <ProfileForm
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
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))