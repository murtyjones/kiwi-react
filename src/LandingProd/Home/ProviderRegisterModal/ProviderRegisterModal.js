import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import update from 'immutability-helper'
import * as Promise from 'bluebird'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
import has from 'lodash/has'

import ProviderRegisterForm from './ProviderRegisterForm'
import {
  login, register, postSubscription, putSubscription, putProfile, closeModal, signout
} from '../../../actions'
import { SUBSCRIPTION_STATUSES } from '../../../constants'
import { choosePathSlide, providerSlides, studentSlides } from './slides'

import '../../../../assets/css/close.css'
import { generateTempPassword } from '../../../utils/psuedoRandomUtils'

const styles = theme => ({
  root: {
    height: '100%',
    minHeight: '400px'
  },
  leftSide: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
    borderRight: '1px solid #CCC',
    display: 'inline-block'
  }
})


class ProviderRegisterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlideIndex: 0
      , providerProfileObject: {}
      , providees: []
      , subscriptions: []
      , providerPassword: ''
      , isStudentSignUp: true
    }
  }

  static propTypes = {
    register: T.func.isRequired
    , login: T.func.isRequired
    , postSubscription: T.func.isRequired
    , putSubscription: T.func.isRequired
    , putProfile: T.func.isRequired
    , closeModal: T.func.isRequired
    , signout: T.func.isRequired
    , fromLogin: T.bool
    , wasStudentSignIn: T.bool
    , history: T.object.isRequired
  }

  UNSAFE_componentWillMount() {
    if (this.props.fromLogin) {
      this.setState({ activeSlideIndex: 1 }) // skip first slide
    }
    if (has(this, 'props.wasStudentSignIn')) {
      this.setState({ isStudentSignUp: this.props.wasStudentSignIn })
    }
  }

  // choose type
  slide0Submit = async isStudentSignUp => {
    this.setState({ isStudentSignUp })
  }

  // register provider
  slide1Submit = async v => {
    const { email, password, termsAccepted } = v
    const result = await this.props.register({ email, password, termsAccepted })
    this.setState({
      providerProfileObject: result,
      providerPassword: v.password
    })
  }

  // register most recently created providee
  slide2Submit = async v => {
    const { providees, providerProfileObject, providerPassword } = this.state
    const last = v.providees.length - 1
    const providee = v.providees[last]
    providee.password = generateTempPassword()
    const promises = [
      this.props.register({
        firstName: providee.firstName,
        lastName: providee.lastName,
        temporaryPassword: providee.password
      }),
      this.props.login({
        email: providerProfileObject.email,
        password: providerPassword
      })
    ]
    const [ registerResult, loginResult ] = await Promise.all(promises)
    this.setState({
      providees: update(providees, {
        $splice: [[providees.length, 0, {
          _id: registerResult._id,
          firstName: providee.firstName,
          username: registerResult.username,
          password: providee.password
        }]]
      })
    })
  }

  // make subscriptions
  slide4Submit = async v => {
    const { providerProfileObject, providees } = this.state
    const promises = [
      this.props.putProfile({
        _id: providerProfileObject._id,
        updateBilling: true,
        stripeCreditCardToken: v.stripeCreditCardToken,
        v: providerProfileObject.v
      })
    ]
    providees.forEach(providee => {
      promises.push(
        this.props.postSubscription({
          providerId: providerProfileObject._id,
          provideeId: providee._id,
          status: SUBSCRIPTION_STATUSES.INACTIVE
        })
      )
    })
    const [ billingResult, ...rest ] = await Promise.all(promises)
    this.setState({ subscriptions: rest })
  }

  // activate subscriptions
  slide5Submit = async v => {
    const { subscriptions } = this.state
    const promises = subscriptions.map(subscription =>
      this.props.putSubscription({
        id: subscription._id,
        status: SUBSCRIPTION_STATUSES.ACTIVE,
        v: subscription.v,
      })
    )
    await Promise.all(promises)
  }

  slide6Submit = async v => {
    const { isProvider } = this.props
    if (!isProvider) {
      this.props.signout()
    }
    this.props.history.push(`/provider/subscriptions`)
    this.props.closeModal()
  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const actionName = `slide${activeSlideIndex}Submit`
    try {
      if (this[actionName]) {
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
    const { classes, switchModals } = this.props
    const { isStudentSignUp, activeSlideIndex, providees } = this.state
    const useCompletionPercentage = !isStudentSignUp && activeSlideIndex > 0
    const completionPercentage = (activeSlideIndex + 1) / providerSlides.length * 100

    const slide = activeSlideIndex === 0
      ? choosePathSlide
      : isStudentSignUp
        ? studentSlides[activeSlideIndex]
        : providerSlides[activeSlideIndex]

    const { SideComponent } = slide

    return (
      <Grid container className={ classes.root }>
        { SideComponent &&
          <Hidden xsDown={ true }>
            <Grid item
              sm={ 5 }
              className={ classes.leftSide }
            >
                <SideComponent />
            </Grid>
          </Hidden>
        }
        <Grid item
          xs={ 12 }
          sm={ SideComponent ? 7 : 12 }
          className='providerRegisterModalFormContainer'
        >
          <ProviderRegisterForm
            onSubmit={ this.handleSubmit }
            slide={ slide }
            activeSlideIndex={ activeSlideIndex }
            goToPrevSlide={ this.goToPrevSlide }
            goToNextSlide={ this.goToNextSlide }
            useCompletionPercentage={ useCompletionPercentage }
            completionPercentage={ completionPercentage }
            switchModals={ switchModals }
            providees={ providees }
          />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth: { isProvider } } = state
  return { isProvider }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: params => dispatch(register(params))
    , signout: () => dispatch(signout())
    , login: params => dispatch(login(params))
    , postSubscription: params => dispatch(postSubscription(params))
    , putSubscription: params => dispatch(putSubscription(params))
    , putProfile: params => dispatch(putProfile(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

ProviderRegisterModal = withStyles(styles, { withTheme: true })(ProviderRegisterModal)

ProviderRegisterModal = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProviderRegisterModal))

export default ProviderRegisterModal
