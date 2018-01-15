import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import renderRichCodeTextEditor from '../../../common/renderRichCodeTextEditor'

class FullPageCodeExample extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.explanation` }
          label='Explanation'
          component={ renderRichTextEditor }
        />
        <Field
          name={ `${slideRef}.example` }
          label='Code Example'
          component={ renderRichCodeTextEditor }
        />
      </div>
    )
  }
}

export default FullPageCodeExample