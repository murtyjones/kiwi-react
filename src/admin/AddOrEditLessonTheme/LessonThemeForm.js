import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'

import { RaisedButton, List, ListItem, MenuItem } from 'material-ui'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import KiwiToggleField from '../../common/KiwiToggleField'
import { SelectField } from 'redux-form-material-ui'

let formName = 'lessonTheme'

const renderAssets = ({ fields }) => (
  <List>
    <ListItem>
      <RaisedButton onClick={ () => fields.push({}) }>Add Asset</RaisedButton>
    </ListItem>
    { fields.map((member, i) =>
      <ListItem key={ i }>
        <RaisedButton onClick={ () => fields.remove(i) }>Remove Member</RaisedButton>
        <h4>Asset #{i + 1}</h4>
        <Field
          name={`${member}.assetUrl`}
          placeholder="Asset URL"
          component={ renderTextField }
        />
        <Field
          name={`${member}.relativeTo`}
          hintText="Relative to..."
          component={ SelectField }
        >
          <MenuItem key='right' value='right' primaryText={ 'Relative to right side' } />
          <MenuItem key='left' value='left' primaryText={ 'Relative to left side' } />
        </Field>
        <h5>Dimensions</h5>
        <Field
          name={ 'x' }
          label={ 'X pixels (e.g. 100)' }
          component={ KiwiSliderField }
          defaultValue={ 0 }
          min={ 0 }
          step={ 1 }
          max={ 2500 }
        />
        <Field
          name={ 'y' }
          label={ 'Y pixels (e.g. 100)' }
          component={ KiwiSliderField }
          defaultValue={ 0 }
          min={ 0 }
          step={ 1 }
          max={ 2500 }
        />
      </ListItem>
    ) }
  </List>
)

class LessonThemeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {

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
          name={ 'name' }
          hintText={ 'Theme Name' }
          component={ renderTextField }
        />
        <Field
          name={ 'foregroundColor' }
          placeholder={ 'Foreground Color (HEX, e.g. #000000)' }
          component={ renderTextField }
        />
        <Field
          name={ 'backgroundColor' }
          placeholder={ 'Background Color (HEX, e.g. #000000)' }
          component={ renderTextField }
        />
        <FieldArray
          name="assets"
          component={ renderAssets }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

LessonThemeForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonThemeForm)

export default withRouter(LessonThemeForm)
