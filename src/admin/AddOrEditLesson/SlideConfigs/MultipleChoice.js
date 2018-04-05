import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import renderTextField from '../../../common/renderTextField'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import { RaisedButton, List, ListItem, MenuItem } from 'material-ui'
import { SelectField } from 'redux-form-material-ui'

const renderChoices = ({ fields }) =>
  <List>
    <ListItem>
      <RaisedButton onClick={ () => fields.push({}) }>Add Choice</RaisedButton>
    </ListItem>
    { fields.map((assetRef, i) =>
      <ListItem key={ i }>
        <RaisedButton onClick={ () => fields.remove(i) }>Remove Choice</RaisedButton>
        <h3>Choice #{i + 1}</h3>
        <Field
          name={ `${assetRef}` }
          hintText='Choice Text'
          component={ renderTextField }
        />
      </ListItem>
    ) }
  </List>

class MultipleChoice extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef, slideValues } = this.props
    const choices = slideValues.choices || []
    return (
      <div>
        <Field
          name={ `${slideRef}.instructions` }
          label='Instructions'
          component={ renderRichTextEditor }
        />
        <Field
          name={ `${slideRef}.successMessage` }
          placeholder='Success Message'
          component={ renderTextField }
          hintText='Success Message'
        />
        <Field
          name={ `${slideRef}.failureHint` }
          placeholder='Failure Hint'
          component={ renderTextField }
          hintText='Failure Hint'
        />
        <Field
          name={ `${slideRef}.correctAnswerIndex` }
          placeholder='Correct Answer'
          component={ SelectField }
          hintText='Correct Answer'
        >
          { choices.map((e, i) =>
            <MenuItem key={ i } value={ i } primaryText={ e } />
          ) }
        </Field>
        <FieldArray
          name={ `${slideRef}.choices` }
          component={ renderChoices }
          slideValues={ slideValues }
        />
      </div>
    )
  }
}

export default MultipleChoice