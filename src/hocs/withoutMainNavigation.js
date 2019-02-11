import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeTopBar, openTopBar } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import * as T from 'prop-types'

export default function withoutMainNavigation(WrappedComponent, options = {}) {
  const HOC = class extends Component {
    static propTypes = {
      closeTopBar: T.func.isRequired,
      openTopBar: T.func.isRequired,
    }

    componentDidMount() {
      this.props.closeTopBar()
    }

    componentDidUpdate() {
      if (this.props.isTopBarOpen) {
        this.props.closeTopBar()
      }
    }

    componentWillUnmount() {
      this.props.openTopBar()
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  const mapStateToProps = (state) => {
    const { topBar: { isTopBarOpen } } = state
    return {
      isTopBarOpen
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      openTopBar: () => dispatch(openTopBar()),
      closeTopBar: () => dispatch(closeTopBar()),
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(HOC))
}
