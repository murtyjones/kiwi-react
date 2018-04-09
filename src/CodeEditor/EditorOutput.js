import React, { Component, Fragment } from 'react'
import { Card, CardText } from 'material-ui/Card'

import ErrorMessage from './ErrorMessage'
import insertIf from '../utils/insertIf'

const styles = {
  base: {
    height: '100%'
    , overflowX: 'scroll'
    , boxSizing: 'border-box'
  },
  textareaStyle: {
    padding: '0px'
    , border: '0px'
    , color: 'rgb(253, 220, 255)'
    , margin: '0px'
    , height: '16px'
    , fontFamily: 'monospace'
    , width: '179px'
    , background: 'transparent'
    , resize: 'none'
    , outline: 'none'
    , overflow: 'hidden'
    , fontSize: '15px' // should match the editorOverrides.css number too
  },
  pre: {
    padding: '15px 0 0 15px'
    , margin: 0
  }
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
    const cardDisplay = !!errorMsg ? { display: 'none' } : {  }
    return (
      <Fragment>
        <div style={ { ...styles.base, ...style, ...cardDisplay } }>
          <div>
            <pre id='editorOutput' style={ styles.pre }>
              { editorOutput }
              <textarea
                style={ styles.textareaStyle }
                className='rawInput'
                ref={ setInputRef }
                onChange={ this.handleChange }
                value={ value }
              />
            </pre>
          </div>
        </div>
        { errorMsg &&
          <ErrorMessage
            key='error'
            style={ { ...styles.base, ...style } }
            errorMsg={ errorMsg }
          />
        }
      </Fragment>
    )
  }

}
