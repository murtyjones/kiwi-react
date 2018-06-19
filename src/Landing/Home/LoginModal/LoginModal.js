import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'

import LoginModalForm from './LoginModalForm'
import {
  login, register, postSubscription, putSubscription, putProfile, closeModal
} from '../../../actions'
import { choosePathSlide, studentSlides, providerSlides } from './slides'

import '../../../close.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  leftImage: {
    background: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/KidCarl_xly3ot.svg) center center no-repeat',
    backgroundSize: '200px',
    backgroundColor: 'blue'
  }
})


class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , isStudentSignIn: true
    }
  }

  static propTypes = {
    register: T.func.isRequired
    , login: T.func.isRequired
    , postSubscription: T.func.isRequired
    , putSubscription: T.func.isRequired
    , putProfile: T.func.isRequired
    , closeModal: T.func.isRequired
  }

  slide0Submit = async isStudentSignIn => {
    this.setState({ isStudentSignIn })
  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const actionName = `slide${activeSlideIndex}Submit`
    try {
      if(this[actionName]) {
        const result = await this[actionName](v)
      }
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
    const { classes } = this.props
    const { activeSlideIndex, isStudentSignIn } = this.state

    const slide = activeSlideIndex === 0
      ? choosePathSlide
      : isStudentSignIn
      ? studentSlides[activeSlideIndex]
      : providerSlides[activeSlideIndex]

    return (
      <Grid container spacing={ 3 } className={ classes.root }>
        <Grid item
          sm={ activeSlideIndex > 0 ? 5 : 0 }
          className={ classes.leftImage }
        />
        <Grid item xs={ 12 }
          sm={ activeSlideIndex > 0 ? 7 : 12 }
          className='loginModalFormContainer'
        >
          <LoginModalForm
            onSubmit={ this.handleSubmit }
            slide={ slide }
            activeSlideIndex={ activeSlideIndex }
            goToPrevSlide={ this.goToPrevSlide }
            goToNextSlide={ this.goToNextSlide }
          />
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: params => dispatch(register(params))
    , login: params => dispatch(login(params))
    , postSubscription: params => dispatch(postSubscription(params))
    , putSubscription: params => dispatch(putSubscription(params))
    , putProfile: params => dispatch(putProfile(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

LoginModal = withStyles(styles, { withTheme: true })(LoginModal)

export default withRouter(connect(null, mapDispatchToProps)(LoginModal))
