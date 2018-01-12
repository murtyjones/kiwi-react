import React, { Component } from 'react'
import { Card, CardText } from 'material-ui/Card'

import ErrorMessage from './ErrorMessage'
import { introEditorOutput } from './introduction'

const styles = {
  base: {
    minHeight: '600px',
  },
}

const textareaStyle = {
  padding: '0px',
  border: '0px',
  fontSize: '14px',
  color: 'rgb(253, 220, 255)',
  margin: '0px',
  height: '16px',
  fontFamily: 'monospace',
  width: '179px',
  background: 'transparent',
  resize: 'none',
  outline: 'none'
}

export default class EditorOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { editorOutput, errorMsg, setInputRef, prompt = '' } = this.props
    const { value } = this.state
    return (
      !errorMsg ? (
        <Card
          style={ styles.base }
          data-intro={ introEditorOutput }
          data-step={ 3 }
          data-position={ 'auto' }
        >
          <CardText>
            <pre>
              { editorOutput }
              <textarea
                style={ textareaStyle }
                className='rawInput'
                ref={ setInputRef }
                onChange={ this.handleChange }
                value={ value }
              />
            </pre>
          </CardText>
        </Card>
      ) : (
        <ErrorMessage
          style={ styles.base }
          errorMsg={ errorMsg }
        />
      )
    )
  }

}
