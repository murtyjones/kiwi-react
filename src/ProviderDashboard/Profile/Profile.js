import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getProfile } from '../../actions'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    profile: T.object.isRequired,
    userId: T.string.isRequired,
    getProfile: T.func.isRequired,
  }

  componentWillMount() {
    const { userId, getProfile } = this.props
    getProfile({userId})
  }

  render() {
    return (
      <div>hi</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { userId }, profiles: { profilesById } } = state
  const profile = profilesById[userId] || {}

  return {
    profile
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: params => dispatch(getProfile(params))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))