import React, { Component } from 'react'
import * as T from 'prop-types'
import ProviderRegisterForm from './ProviderRegisterForm'
import '../../../close.css'


export default class SubscribeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
    }
  }

  static propTypes = {
    handleSubmit: T.func.isRequired
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  render() {
    const { activeSlideIndex } = this.state

    return (
      <div className='subscribeModalFormContainer'>
        <ProviderRegisterForm
          activeSlideIndex={ activeSlideIndex }
          onSubmit={ this.props.handleSubmit }
          goToPrevSlide={ this.goToPrevSlide }
          goToNextSlide={ this.goToNextSlide }
        />
      </div>
    )
  }
}
