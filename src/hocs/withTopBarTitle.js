import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTopBarTitle, toggleTopBarTitleIsDisabled, setTopBarMiddleSectionIsVisible } from '../actions'
import withRouter from 'react-router-dom/withRouter'
import * as T from 'prop-types'

export default function withTopBarTitle(WrappedComponent, { title = '', topBarTitleDisabled = true, showMiddleSection = true }) {
  const HOC = class extends Component {
    static propTypes = {
      setTopBarTitle: T.func.isRequired,
      toggleTopBarTitleIsDisabled: T.func.isRequired,
      setTopBarMiddleSectionIsVisible: T.func.isRequired,
    }

    componentDidMount() {
      this.props.setTopBarTitle(title)
      this.props.toggleTopBarTitleIsDisabled(topBarTitleDisabled)
      this.props.setTopBarMiddleSectionIsVisible(showMiddleSection)
    }

    componentWillUnmount() {
      this.props.setTopBarTitle('')
      this.props.toggleTopBarTitleIsDisabled(true)
      this.props.setTopBarMiddleSectionIsVisible(true)
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setTopBarTitle: params => dispatch(setTopBarTitle(params)),
      toggleTopBarTitleIsDisabled: params => dispatch(toggleTopBarTitleIsDisabled(params)),
      setTopBarMiddleSectionIsVisible: params => dispatch(setTopBarMiddleSectionIsVisible(params))
    }
  }

  return withRouter(connect(null, mapDispatchToProps)(HOC))
}

