import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import has from 'lodash/has'


export default class SlideInOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: has(props, 'show') ? props.show : false
    }
  }

  componentDidMount() {
    this.setState({ show: true })
  }

  // componentWillUnmount() {
  //   this.setState({ show: false })
  // }

  render() {
    const { show } = this.state
    const { children } = this.props

    return (
      <CSSTransition
        in={ show }
        classNames='slideInOut'
        timeout={ 400 }
      >
        { children }
      </CSSTransition>
    )
  }
}
