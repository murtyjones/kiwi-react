import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import KiwiTextField from '../../../common/form/KiwiTextField'
import KiwiSelectField from '../../../common/form/Select/KiwiSelectField'
import RichTextEditor from '../../../common/RichTextEditor'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'


const renderChoices = ({ fields }) =>
  <List>
    { [...Array(4)].map((x, i) => {
      const assetRef = `${fields.name}[${i}]`
      return (
        <ListItem key={ i }>
          <h3>Choice #{i + 1}</h3>
          <Field
            name={ `${assetRef}` }
            label='Choice Text'
            component={ KiwiTextField }
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
    const { slideRef, slideValues, variableOptions } = this.props
    const choices = slideValues.choices || []

    return (
      <div>
        <Field
          name={ `${slideRef}.instructionsLabel` }
          label='Instructions Box Label'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.instructions` }
          label='Instructions'
          component={ RichTextEditor }
          variableOptions={ variableOptions }
        />
        <Field
          name={ `${slideRef}.successHeadline` }
          label='Success Headline'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.successExplanation` }
          label='Success Explanation'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.failureHeadline` }
          label='Failure Headline'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.failureExplanation` }
          label='Failure Explanation'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.correctAnswerIndex` }
          component={ KiwiSelectField }
          label='Correct Answer'
          options={ choices.map((e, i) => ({ label: e, value: i })) }
        />
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
