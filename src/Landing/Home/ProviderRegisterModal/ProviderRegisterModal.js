import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import ProviderRegisterForm from './ProviderRegisterForm'
import { SubmissionError } from 'redux-form'
import '../../../close.css'
import slides from './slides'


class ProviderRegisterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
    }
  }

  static propTypes = {

  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const { action, makeParams } = slides[activeSlideIndex]
    console.log(action)
    console.log(action.name)
    try {
      const params = makeParams(v)
      const result = await this.props[action.name](params)
      this.goToNextSlide()
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: err.message })
    }
  }

  goToNextSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })


  goToPrevSlide = () =>
    this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })

  render() {
    const { activeSlideIndex } = this.state
    const { action, makeParams } = slides[activeSlideIndex]
    return (
      <div className='subscribeModalFormContainer'>
        <ProviderRegisterForm
          onSubmit={ this.handleSubmit }
          slide={ slides[activeSlideIndex] }
          activeSlideIndex={ activeSlideIndex }
          goToPrevSlide={ this.goToPrevSlide }
          goToNextSlide={ this.goToNextSlide }
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return slides.reduce((acc, each) => {
    if (each.action)
      acc[each.action.name] = params => dispatch(each.action(params))
    return acc
  }, {})
}

export default connect(null, mapDispatchToProps)(ProviderRegisterModal)
