import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import renderTextField from '../../../common/renderTextField'

const styles = {
  container: {
    contentAlign: 'top'
  },
  half: {
    width: '50%',
    display: 'inline-block'
  },
  editorStyle: {
    height: '500px'
  },
  label: {
    textAlign: 'center'
  },
  textArea: {
    border: '1px solid #ccc',
    height: '500px',
    width: '100%'
  }
}

class HalfCodeHalfText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef } = this.props
    return (
      <div style={ styles.container }>
        <div style={ styles.half }>
          <label style={ styles.label }>
            Instructions
          </label>
        </div>
        <div style={ styles.half }>
          <label style={ styles.label }>
            Editor Input
          </label>
        </div>
        <div style={ styles.half }>
          <Field
            name={ `${slideRef}.instructions` }
            component={ renderRichTextEditor }
            style={ styles.editorStyle }
          />
        </div>
        <div style={ styles.half }>
          <Field
            name={ `${slideRef}.editorInput` }
            component={ renderTextField }
            multiLine={ true }
            underlineShow={ false }
            rows={ 20 }
            style={ styles.textArea }
          />
        </div>
      </div>
    )
  }
}

export default HalfCodeHalfText