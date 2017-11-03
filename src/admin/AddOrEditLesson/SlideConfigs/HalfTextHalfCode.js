import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderRichTextEditor from '../../../common/renderRichTextEditor'

class HalfCodeHalfText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.slideContent` }
          component={ renderRichTextEditor }
        />
      </div>
    )
  }
}

export default HalfCodeHalfText