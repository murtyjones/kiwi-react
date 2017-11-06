import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderTextField from '../../../common/renderTextField'

const styles = {
  prompt: {
    border: '1px solid #ccc',
    height: '100px',
    width: '100%'
  },
  textArea: {
    border: '1px solid #ccc',
    height: '500px',
    width: '100%'
  }
}

class FullPageCode extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef } = this.props
    return (
      <div>
        <Field
          name={ `${slideRef}.prompt` }
          label={ 'Prompt (optional)' }
          component={ renderTextField }
          multiLine={ true }
          underlineShow={ false }
          rows={ 2 }
          style={ styles.prompt }
        />
        <Field
          name={ `${slideRef}.editorInput` }
          label={ 'Editor Input' }
          component={ renderTextField }
          multiLine={ true }
          underlineShow={ false }
          rows={ 20 }
          style={ styles.textArea }
        />
      </div>
    )
  }
}

export default FullPageCode