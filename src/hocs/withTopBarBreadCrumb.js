import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTopBarBreadCrumb } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import * as T from 'prop-types'

export default function withTopBarBreadCrumb(WrappedComponent, { breadcrumbLink = '', breadcrumbText = '' }) {
  const HOC = class extends Component {
    static propTypes = {
      setTopBarBreadCrumb: T.func.isRequired,
    }

    componentDidMount() {
      this.props.setTopBarBreadCrumb({ breadcrumbLink, breadcrumbText })
    }

    componentWillUnmount() {
      this.props.setTopBarBreadCrumb({ breadcrumbLink: '', breadcrumbText: '' })
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setTopBarBreadCrumb: params => dispatch(setTopBarBreadCrumb(params))
    }
  }

  return withRouter(connect(null, mapDispatchToProps)(HOC))
}

