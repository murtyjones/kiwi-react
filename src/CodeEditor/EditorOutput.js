import React, { Component } from 'react'
import { Card, CardText } from 'material-ui/Card'

import ErrorMessage from './ErrorMessage'
import insertIf from '../utils/insertIf'

const styles = {
  base: {
    height: '100%'
    , overflowX: 'scroll'
  },
}

const textareaStyle = {
  padding: '0px'
  , border: '0px'
  , fontSize: '14px'
  , color: 'rgb(253, 220, 255)'
  , margin: '0px'
  , height: '16px'
  , fontFamily: 'monospace'
  , width: '179px'
  , background: 'transparent'
  , resize: 'none'
  , outline: 'none'
  , overflow: 'hidden'
}

export default class EditorOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const valueHasChanged = nextProps.value !== this.props.value
    if(nextProps.value && valueHasChanged) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { editorOutput, errorMsg, setInputRef, style, prompt = '' } = this.props
    const { value } = this.state
    const cardDisplay = !!errorMsg ? { display: 'none' } : {}
    return [
      <Card
        key='output'
        style={ {
          ...styles.base
          , ...style
          , ...cardDisplay
        } }
      >
        <CardText>
          <pre id="editorOutput">
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
      ,
      ...insertIf(errorMsg,
        <ErrorMessage
          key='error'
          style={ {
            ...styles.base
            , ...style
          } }
          errorMsg={ errorMsg }
        />
      )
    ]
  }

}
