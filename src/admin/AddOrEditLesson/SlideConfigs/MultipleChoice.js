import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import renderTextField from '../../../common/renderTextField'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import { RaisedButton, List, ListItem, MenuItem } from 'material-ui'
import { SelectField } from 'redux-form-material-ui'

const renderChoices = ({ fields }) =>
  <List>
    { [...Array(4)].map((x, i) => {
      const assetRef = `${fields.name}[${i}]`
      return (
        <ListItem key={ i }>
          <h3>Choice #{i + 1}</h3>
          <Field
            name={ `${assetRef}` }
            hintText='Choice Text'
            component={ renderTextField }
          />
        </ListItem>
      )
    }) }
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
          name={ `${slideRef}.successHeadline` }
          hintText='Success Headline'
          component={ renderTextField }
        />
        <Field
          name={ `${slideRef}.successExplanation` }
          hintText='Success Explanation'
          component={ renderTextField }
        />
        <Field
          name={ `${slideRef}.failureHeadline` }
          hintText='Failure Headline'
          component={ renderTextField }
        />
        <Field
          name={ `${slideRef}.failureExplanation` }
          hintText='Failure Explanation'
          component={ renderTextField }
        />
        <label>Correct Answer<br/></label>
        <Field
          name={ `${slideRef}.correctAnswerIndex` }
          component={ SelectField }
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