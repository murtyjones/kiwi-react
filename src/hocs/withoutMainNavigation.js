import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeSideNav, closeTopBar, openTopBar, openSideNav } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import * as T from 'prop-types'

export default function withoutMainNavigation(WrappedComponent, options = {}) {
  const HOC = class extends Component {
    static propTypes = {
      closeSideNav: T.func.isRequired,
      closeTopBar: T.func.isRequired,
      openSideNav: T.func.isRequired,
      openTopBar: T.func.isRequired,
    }

    componentWillUpdate(nextProps, nextState) {
      this.props.closeSideNav()
      this.props.closeTopBar()
    }

    componentWillMount() {
      this.props.closeSideNav()
      this.props.closeTopBar()
    }

    componentDidMount() {
      this.props.closeSideNav()
      this.props.closeTopBar()
    }

    componentWillUnmount() {
      this.props.openSideNav()
      this.props.openTopBar()
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      openSideNav: () => dispatch(openSideNav())
      , closeSideNav: () => dispatch(closeSideNav())
      , openTopBar: () => dispatch(openTopBar())
      , closeTopBar: () => dispatch(closeTopBar())
    }
  }

  return withRouter(connect(null, mapDispatchToProps)(HOC))
}

