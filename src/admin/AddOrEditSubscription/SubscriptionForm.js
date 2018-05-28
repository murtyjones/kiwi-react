import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import MenuItem from 'material-ui/MenuItem'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import { Toggle, SelectField } from 'redux-form-material-ui'
import { SUBSCRIPTION_STATUSES } from '../../constants'

let formName = 'subscription'

const notEmpty = value => !!value
  ? null
  : 'Cannot be empty!'
const noSpecialCharacters = value => new RegExp(/^[a-zA-Z0-9_]*$/gm).test(value)
  ? null
  : 'No special characters allowed! Only letters, numbers, and underscores.'

class SubscriptionForm extends Component {
  constructor(props) {
    super(props)
    // if subscription has been named and saved,
    // don't allow it to be edited
    const lockVariableName = !!get(props,'initialValues.name')
    this.state = {
      lockVariableName
    }
  }

  static propTypes = {
    initialValues: T.object
    , slideTypes: T.array
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ { width: "100%", height: "100%" } }>
        <Field
          name='providerId'
          hintText='Provider ID'
          component={ renderTextField }
          disabled={ true }
        />
        <Field
          name='provideeId'
          hintText='Providee ID'
          component={ renderTextField }
          disabled={ true }
        />
        <Field
          name='stripeCreditCardToken'
          hintText='Stripe Credit Card Token'
          component={ renderTextField }
          disabled={ true }
        />
        <Field
          name='status'
          component={ SelectField }
          hintText='Subscription Status'
          floatingLabelText='Subscription Status'
        >
          { Object.values(SUBSCRIPTION_STATUSES).map(status =>
            <MenuItem
              key={ status }
              value={ status }
              primaryText={ status }
            />
          ) }
        </Field>
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

SubscriptionForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(SubscriptionForm)

export default withRouter(SubscriptionForm)
