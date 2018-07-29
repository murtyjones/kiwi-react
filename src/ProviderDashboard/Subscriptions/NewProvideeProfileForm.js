import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import KiwiTextField from '../../common/form/KiwiTextField'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import { required, alphaNumeric } from '../../utils/validationUtils'
import { generateTempPassword } from '../../utils/psuedoRandomUtils'
import { openModal, closeModal } from '../../actions'
import ConfirmPasswordModal from '../../common/modals/ConfirmPasswordModal/ConfirmPasswordModal'
import ProspectiveSubscriptionTable from '../../Landing/Home/ProviderRegisterModal/slides/ProspectiveSubscriptionTable'
import { purple } from '../../colors'

export const formName = 'newProvideeProfileForm'

const styles = {
  form: {
    width: '100%'
    , background: '#FFFFFF'
    , paddingBottom: '60px'
  },
  preConfirmHeader: {
    color: purple
  }
}

class ProvideeProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkCopied: false,
      passwordConfirmed: false,
      submittedValues: {},
      loading: false
    }
  }

  static propTypes = {
    initialValues: T.object.isRequired
    , formValues: T.object.isRequired
    , handleSubmit: T.func.isRequired
    , onSubmit: T.func.isRequired
    , openModal: T.func.isRequired
    , closeModal: T.func.isRequired
    , submitFailed: T.bool
    , submitSucceeded: T.bool
    , classes: T.object.isRequired
  }

  setStateAsync = newState => new Promise((resolve) => {
    this.setState(newState, resolve)
  })

  async UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.passwordConfirmed && !this.state.passwordConfirmed) {
      this.setStateAsync({ loading: true })
      this.props.closeModal()
      await this.props.onSubmit({
        firstName: nextState.submittedValues.firstName,
        temporaryPassword: generateTempPassword()
      })
      this.setStateAsync({ loading: false })
    }
  }

  confirmPasswordCallback = v => {
    this.setState({ passwordConfirmed: v })
  }

  renderPreConfirmMessage = () => {
    const { classes } = this.props
    const { submittedValues: { firstName } } = this.state
    return (
      <div>
        <h3 className={ classes.preConfirmHeader }>Thanks for signing up a new student!</h3>
        <br />
        Please review your new subscription details and confirm by entering your password.<br />
        <ProspectiveSubscriptionTable
          providees={ [
            { firstName }
          ] }
        />
      </div>
    )
  }

  localHandleSubmit = async v => {
    await this.setStateAsync({ submittedValues: v })
    this.props.openModal({
      className: 'confirmPasswordModal',
      children: (
        <ConfirmPasswordModal
          preConfirmMessage={ this.renderPreConfirmMessage() }
          callback={ this.confirmPasswordCallback }
        />
      ),
    })
  }

  render() {
    const { classes, handleSubmit, submitFailed } = this.props
    const { loading } = this.state
    const derivedHandleSubmit = handleSubmit(this.localHandleSubmit)

    return (
      <form onSubmit={ derivedHandleSubmit } className={ classes.form }>
        <Field
          name='firstName'
          label='First Name'
          component={ KiwiTextField }
          disabled={ loading }
          validate={ [ required, alphaNumeric ] }
        />
        <SubmitButton
          text='Create Student'
          { ...this.props }
          disabled={ loading }
          onClick={ derivedHandleSubmit }
        />

        { loading && <div className='spinner' /> }

        { submitFailed &&
          <ResultMessage { ...this.props } />
        }

      </form>
    )
  }
}

ProvideeProfileForm = reduxForm({
  form: formName, enableReinitialize: true
})(ProvideeProfileForm)

ProvideeProfileForm = withStyles(styles, { withTheme: true })(ProvideeProfileForm)

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: params => dispatch(openModal(params))
    , closeModal: params => dispatch(closeModal(params))
  }
}

ProvideeProfileForm = connect(state => ({
  formValues: getFormValues(formName)(state)
}), mapDispatchToProps)(ProvideeProfileForm)

export default ProvideeProfileForm
