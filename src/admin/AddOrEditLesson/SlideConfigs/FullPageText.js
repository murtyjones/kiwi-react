import React, { Component } from 'react'
import { Field } from 'redux-form'
import RichTextEditor from '../../../common/RichTextEditor'
import KiwiTextField from "../../../common/form/KiwiTextField";

class FullPageText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef, variableOptions } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.instructionsLabel` }
          label='Instructions Box Label'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.characterUrl` }
          label='Left hand side character URL'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.instructions` }
          component={ RichTextEditor }
          variableOptions={ variableOptions }
        />
      </div>
    )
  }
}

export default FullPageText
