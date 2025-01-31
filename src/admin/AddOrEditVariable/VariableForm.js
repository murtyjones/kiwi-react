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

let formName = 'variable'

const notEmpty = value => !!value
  ? null
  : 'Cannot be empty!'
const noSpecialCharacters = value => new RegExp(/^[a-zA-Z0-9_]*$/gm).test(value)
  ? null
  : 'No special characters allowed! Only letters, numbers, and underscores.'

class VariableForm extends Component {
  constructor(props) {
    super(props)
    // if variable has been named and saved,
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
    const { handleSubmit, submitting, error } = this.props

    const { lockVariableName } = this.state
    return (
      <form onSubmit={ handleSubmit } style={ { width: "100%", height: "100%" } }>
        <Field
          name='name'
          hintText='Variable Name'
          component={ renderTextField }
          validate={[ notEmpty, noSpecialCharacters ]}
          disabled={ lockVariableName }
        />
        <Field
          name='defaultValue'
          hintText='Default Value'
          component={ renderTextField }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
        { error && <strong>{ error }</strong> }
      </form>
    )
  }
}

VariableForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(VariableForm)

export default withRouter(VariableForm)
