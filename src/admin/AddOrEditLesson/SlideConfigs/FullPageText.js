import React, { Component } from 'react'
import { Field } from 'redux-form'
import RichTextEditor from '../../../common/RichTextEditor'

class FullPageText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef, variableOptions } = this.props
    return (
      <div>
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