import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import BluebirdPromise from 'bluebird' // setStateAsync doesn't play nicely with bluebird so keep import as BluebirdPromise
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
      , createdProvidees: []
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
    , switchModals: T.func.isRequired
    , signout: T.func.isRequired
    , fromLogin: T.bool
    , wasStudentSignIn: T.bool
    , history: T.object.isRequired
    , classes: T.object.isRequired
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

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

  // do EVERYTHING
  slide5Submit = async formValues => {
    const { email, password, termsAccepted, providees, stripeCreditCardToken } = formValues

    // register provider
    const providerProfileObject = await this.props.register({
      email, password, termsAccepted
    })


    // register providees
    const provideePromises = providees.map(each =>
      this.props.register({
        firstName: each.firstName,
        temporaryPassword: each.temporaryPassword
      })
    )

    const createdProvidees = await BluebirdPromise.all(provideePromises)

    await this.setStateAsync({ createdProvidees })

    // login provider
    await this.props.login({
      email: providerProfileObject.email,
      password: password
    })


    // update billing info
    await this.props.putProfile({
      _id: providerProfileObject._id,
      updateBilling: true,
      stripeCreditCardToken: stripeCreditCardToken,
      v: providerProfileObject.v
    })


    // make subscriptions
    const makeSubscriptionPromises = createdProvidees.map(each =>
      this.props.postSubscription({
        providerId: providerProfileObject._id,
        provideeId: each._id,
        status: SUBSCRIPTION_STATUSES.INACTIVE
      })
    )
    const subscriptions = await BluebirdPromise.all(makeSubscriptionPromises)


    // activate subscriptions
    const activateSubcriptionPromises = subscriptions.map(subscription =>
      this.props.putSubscription({
        id: subscription._id,
        status: SUBSCRIPTION_STATUSES.ACTIVE,
        v: subscription.v,
      })
    )

    await BluebirdPromise.all(activateSubcriptionPromises)
  }

  // redirect to dashboard
  slide6Submit = async () => {
    this.props.history.push(`/provider/subscriptions`)
    this.props.closeModal()
  }

  handleSubmit = async v => {
    const { activeSlideIndex } = this.state
    const actionName = `slide${activeSlideIndex}Submit`
    try {
      if (this[actionName]) {
        await this[actionName](v)
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
    const { isStudentSignUp, activeSlideIndex, createdProvidees } = this.state
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
            createdProvidees={ createdProvidees }
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
