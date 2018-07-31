import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileDetails } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import * as T from 'prop-types'
import get from 'lodash/get'

export default function withRedirectIfTempPassword(WrappedComponent) {
  const HOC = class extends Component {
    constructor(props) {
      super()
      if (get(props, 'profile.temporaryPassword', '')) {
        props.history.push('/student')
      } else {
        // retrieve profile details (for temporaryPassword check)
        props.getProfileDetails({ userId: props.userId })
      }
    }

    static propTypes = {
      getProfileDetails: T.func.isRequired,
      userId: T.string.isRequired,
      history: T.object.isRequired,
    }

    componentDidUpdate(prevProps, prevState) {
      if (get(this.props, 'profile.temporaryPassword', '')) {
        this.props.history.push('/student')
      }
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  const mapStateToProps = state => {
    const { auth: { userId } } = state
    return { userId }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      getProfileDetails: params => dispatch(getProfileDetails(params))
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(HOC))
}

