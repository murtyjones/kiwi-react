import React, { Component } from 'react'

export default class WithTheme extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { title, setTopBarTitle, toggleTopBarTitleIsDisabled, topBarTitleDisabled = true } = this.props
    setTopBarTitle(title || '')
    toggleTopBarTitleIsDisabled(topBarTitleDisabled)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { title, topBarTitleDisabled } = this.props
    const { title: nextTitle, topBarTitleDisabled: nextTopBarTitleDisabled = true, setTopBarTitle, toggleTopBarTitleIsDisabled } = nextProps
    if(title !== nextTitle) setTopBarTitle(nextTitle || '')
    if(topBarTitleDisabled !== nextTopBarTitleDisabled) toggleTopBarTitleIsDisabled(nextTopBarTitleDisabled)
  }

  render() {
    const { WrappedComponent } = this.props

    return <WrappedComponent { ...this.props } />
  }
}
