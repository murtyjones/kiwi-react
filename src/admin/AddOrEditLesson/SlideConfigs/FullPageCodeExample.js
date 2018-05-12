import React, { Component } from 'react'
import { Field } from 'redux-form'
import RichTextEditor from '../../../common/RichTextEditor'

class FullPageCodeExample extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef, variableOptions } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.explanation` }
          label='Explanation'
          component={ RichTextEditor }
          variableOptions={ variableOptions }
        />
        <Field
          name={ `${slideRef}.example` }
          label='Code Example'
          component={ RichTextEditor }
          variableOptions={ variableOptions }
        />
      </div>
    )
  }
}

export default FullPageCodeExample