import React, { Component } from 'react'

export default class WithTheme extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { title, setTopBarTitle } = this.props
    setTopBarTitle(title || '')
  }

  componentWillReceiveProps(nextProps) {
    const { title } = this.props
    const { title: nextTitle, setTopBarTitle } = nextProps
    if(title !== nextTitle) setTopBarTitle(nextTitle || '')
  }

  render() {
    const { WrappedComponent } = this.props

    return <WrappedComponent { ...this.props } />
  }
}
