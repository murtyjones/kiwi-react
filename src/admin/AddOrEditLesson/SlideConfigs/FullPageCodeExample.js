import React, { Component } from 'react'
import { Field } from 'redux-form'
import RichTextEditor from '../../../common/RichTextEditor'
import KiwiTextField from "../../../common/form/KiwiTextField";

class FullPageCodeExample extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef, variableOptions } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.characterUrl` }
          label='Left hand side character URL'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.exampleLabel` }
          label='Example Box Label'
          component={ KiwiTextField }
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
