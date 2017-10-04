import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';

import ErrorMessage from './ErrorMessage';
import { introEditorOutput } from './introduction';

const styles = {
  base: {
    minHeight: '600px',
  },
}

export default class OutputArea extends Component {
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
    const { editorOutput, errorMsg, refInput, prompt = '' } = this.props
    const { value } = this.state
    return (
      !errorMsg ? (
        <Card
          style={styles.base}
          data-intro={introEditorOutput}
          data-step={3}
          data-position={'auto'}
        >
          <CardText>
          <pre>
            { editorOutput }
          </pre>
            { prompt  }
            <textarea className='rawInput' ref={ refInput } onChange={ this.handleChange } value={ value } />
          </CardText>
        </Card>
      ) : (
        <ErrorMessage
          style={styles.base}
          errorMsg={errorMsg}
        />
      )
    )
  }

}
//export default OutputArea;
