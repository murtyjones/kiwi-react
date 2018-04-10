import React, { Component, Fragment } from 'react'
import cns from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { COMMON_ERRORS } from './commonErrors'
import setTimeoutAsync from '../utils/setTimeoutAsync'

const styles = {
  container: {
    position: 'absolute'
    , height: '100%'
    , width: '50%'
    , left: '50%'
    , overflowX: 'scroll'
    , fontFamily: 'Monospace'
    , padding: '15px 15px 0 15px'
    , boxSizing: 'border-box'
    , backgroundColor: 'rgb(246, 246, 246)'
    , boxShadow: 'none'
    , borderRadius: 0
    , border: '1px solid #CCCCCC'
    , borderLeft: 0
    , borderTopRightRadius: '10px'
    , borderBottomRightRadius: '10px'
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
    margin: 0
  },
  hintContainer: {
    overflow: 'hidden'
    , position: 'absolute'
    , bottom: 0
    , left: 0
    , width: '100%'
    , borderRadius: '0 0 8px 0' // needs to be slightly less than the 10px radius on the rest of the editor
  },
  hint: {
    fontFamily: 'Arvo'
    , padding: '15px'
    , backgroundColor: '#8eb4ec'
    , height: '100%'
    , width: '100%'
    , color: 'white'
    , boxSizing: 'border-box'
  },
  hintH3: {
    margin: '0 0 10px 0'
  },
  closeButton: {
    position: 'absolute'
    , right: '15px'
    , top: '15px'
  }
}

const getHint = errorMsg => Object.keys(COMMON_ERRORS).reduce((hintHTML, each) => {
  if(errorMsg && errorMsg.toLowerCase().includes(each.toLowerCase()))
    hintHTML = COMMON_ERRORS[each].html
  return hintHTML
}, null)


const Hint = ({ errorHintHTML, showHint, closeHint }) =>
  <div style={ {
    ...styles.hintContainer
    // only display if theres a message. Otherwise,
    // keep mounted for animation purposes:
    , display: errorHintHTML ? 'block' : 'none'
  } }>
    <CSSTransition
      in={ showHint }
      classNames='slideUp'
      timeout={ 300 }
      mountOnEnter={ true }
      unmountOnExit={ true }
    >
      <div style={ styles.hint }>
        <h3 style={ styles.hintH3 }>Having Trouble?</h3>
        <div dangerouslySetInnerHTML={ { __html: errorHintHTML } } />
        <div
          className='x-sm'
          style={ styles.closeButton }
          onClick={ closeHint }
        />
      </div>
    </CSSTransition>
  </div>

export default class EditorOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
      , showHint: false
    }
  }

  async componentWillReceiveProps(nextProps) {
    const valueHasChanged = nextProps.value !== this.props.value
    if(nextProps.value && valueHasChanged) {
      this.setState({ value: nextProps.value })
    }

    if(!nextProps.errorMsg && this.props.errorMsg)
      this.setState({ showHint: false })

    if(nextProps.errorMsg && !this.state.showHint) {
      // wait for 2 sec
      await setTimeoutAsync(2000)
      // show hint
      this.setState({ showHint: true })
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { editorOutput, errorMsg, setInputRef } = this.props
    const { value, showHint } = this.state
    const errorHintHTML = getHint(errorMsg)

    return (
      <div
        style={ styles.container }
        className={ cns({ 'outputError': errorMsg }) }
      >
        { !errorMsg
          ? (
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
          ) : (
            <Fragment>
              <div>Oops, there's an error:</div>
              <div>{ errorMsg }</div>
            </Fragment>
          )
        }
        <Hint
          errorHintHTML={ errorHintHTML }
          showHint={ showHint }
          closeHint={ () => this.setState({ showHint: false }) }
        />
      </div>
    )
  }

}
