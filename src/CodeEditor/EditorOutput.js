import React, { Component, Fragment } from 'react'
import cns from 'classnames'
import { CSSTransition } from 'react-transition-group'
import withStyles from '@material-ui/core/styles/withStyles'

import { COMMON_ERRORS, CUSTOM_ERRORS } from './syntaxErrors'
import setTimeoutAsync from '../utils/setTimeoutAsync'
import { babyBlue1, babyBlue2, mainGrey } from '../colors'

const styles = theme => ({
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
    , border: '2px solid #2e0402'
    , borderLeft: 0
    , borderTopRightRadius: 10
    , borderBottomRightRadius: 10
  },
  textareaStyle: {
    padding: '12px 0 0 0'
    , boxSizing: 'border-box'
    , border:  0
    , margin: 0
    , height: 16
    , fontFamily: 'monospace'
    , width: '179px'
    , background: 'transparent'
    , resize: 'none'
    , outline: 'none'
    , overflow: 'hidden'
    , fontSize: '15px' // should match the editorOverrides.css number too
    , position: 'relative'
    , top: '3px'
    , opacity: 0
  },
  pre: {
    margin: 0
  },
  hintContainer: {
    overflow: 'hidden'
    , position: 'absolute'
    , top: 0
    , bottom: 0
    , left: 0
    , right: 0
    , width: '100%'
    , borderRadius: '0 0 8px 0' // needs to be slightly less than the 10px radius on the rest of the editor
  },
  hint: {
    fontFamily: 'Arvo'
    , padding: '15px'
    , backgroundColor: babyBlue1
    , height: '100%'
    , width: '100%'
    , color: 'white'
    , boxSizing: 'border-box'
    , overflow: 'scroll'
  },
  hintH3: {
    margin: '0 0 10px 0'
  },
  closeButton: {
    position: 'absolute'
    , right: '15px'
    , top: '15px'
  },
  fakeInputContainer: {
    display: 'inline-block',
    position: 'absolute',
    fontFamily: 'courier',
    fontSize: '15px',
    padding: '5px',
    overflow: 'hidden'
  },
  fakeInputValue: {
    float: 'left',
    color: babyBlue2,
    whiteSpace: 'pre',
    position: 'relative',
    bottom: 2,
    right: 5
  },
  caret: {
    float: 'left',
    width: '7px',
    height: '14px',
    background: mainGrey,
    position: 'relative',
    bottom: 0,
    right: 3,
  },
  typeYourAnswer: {
    color: mainGrey,
    fontSize: '8pt',
    position: 'relative',
    bottom: 3,
    left: 2
  },
  typeYourAnswerOffset: {
    marginLeft: '7px' // simply using the 'right' property would cutoff the text for some reason
  }
})

const getCommonErrorHint = errorMsg => Object.keys(COMMON_ERRORS).reduce((hintHTML, errorSubstring) => {
  if (errorMsg && errorMsg.toLowerCase().includes(errorSubstring.toLowerCase()))
    hintHTML = COMMON_ERRORS[errorSubstring].makeHtml()
  return hintHTML
}, null)

const getCustomErrorHint = (editorInput, errorMsg) => Object.keys(CUSTOM_ERRORS).reduce((hintHTML, key) => {
  const testFunction = CUSTOM_ERRORS[key].test
  const testPasses = testFunction(editorInput, errorMsg)
  if (testPasses)
    hintHTML = CUSTOM_ERRORS[key].makeHtml(editorInput)
  return hintHTML
}, null)


const Hint = ({ classes, errorHintHTML, showHint, closeHint }) =>
  <div
    className={ classes.hintContainer }
    style={ {
      // only display if theres a message. Otherwise,
      // keep mounted for animation purposes:
      visibility: errorHintHTML ? 'visible' : 'hidden'
    } }
  >
    <CSSTransition
      in={ showHint }
      classNames='slideUp'
      timeout={ 300 }
      mountOnEnter={ true }
      unmountOnExit={ true }
    >
      <div className={ classes.hint }>
        <h3 className={ classes.hintH3 }>Here's a hint:</h3>
        <div dangerouslySetInnerHTML={ { __html: errorHintHTML } } />
        <div className={ cns('x-sm', classes.closeButton) }
          onClick={ closeHint }
        />
      </div>
    </CSSTransition>
  </div>

class EditorOutput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
      , showHint: false
      , caretVisible: false
      , caretBlinkingStatusVisible: false
      , fakeInputValue: ''
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const valueHasChanged = nextProps.value !== this.props.value
    if (nextProps.value && valueHasChanged) {
      this.setState({ value: nextProps.value })
    }

    if (!nextProps.errorMsg && this.props.errorMsg)
      this.setState({ showHint: false })

    if (nextProps.errorMsg && !this.state.showHint) {
      // wait for 2 sec
      await setTimeoutAsync(500)
      // show hint
      this.setState({ showHint: true })
    }
  }

  handleBlur = () => {
    clearInterval(this.interval)
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  intervalFunction = () => {
    this.setState({ caretBlinkingStatusVisible: !this.state.caretBlinkingStatusVisible })
  }

  handleFocus = async () => {
    // this timeout is a hack that prevents handleFocus from
    // entering a race condition with handleKeyUp
    await setTimeoutAsync(10)
    this.interval = setInterval(this.intervalFunction, 500)
    this.setState({
      caretVisible: true
    })
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) { // enter key pressed
      this.setState({
        fakeInputValue: '', caretVisible: false, caretBlinkingStatusVisible: false
      })
      this.handleBlur()
    } else {
      const inputsArray = e.target.value.split('\n')
      this.setState({ fakeInputValue: inputsArray[inputsArray.length - 1] })
    }
  }

  render() {
    const { classes, editorOutput, editorInput, errorMsg, setInputRef, inputDisabled } = this.props
    const { value, showHint, fakeInputValue, caretVisible, caretBlinkingStatusVisible } = this.state
    const errorHintHTML = errorMsg
      ? getCustomErrorHint(editorInput, errorMsg) || getCommonErrorHint(errorMsg)
      : () => null
    return (
      <div className={ cns({ 'outputError': errorMsg }, classes.container) }>
        { !errorMsg
          ? (
            <pre id='editorOutput' className={ classes.pre }>
              { editorOutput }
                <div className={ classes.fakeInputContainer }>
                  { fakeInputValue &&
                    <span className={ classes.fakeInputValue }>
                      { fakeInputValue }
                    </span>
                  }
                  { caretBlinkingStatusVisible &&
                    <div className={ classes.caret } />
                  }
                  { caretVisible &&
                    <span
                      className={ cns(classes.typeYourAnswer, {
                        [classes.typeYourAnswerOffset]: !caretBlinkingStatusVisible
                      }) }
                    >
                      Type an answer and press enter
                    </span>
                  }
                </div>
              <textarea
                disabled={ inputDisabled }
                className={ cns('rawInput', classes.textareaStyle) }
                ref={ setInputRef }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                onChange={ this.handleChange }
                value={ value }
                onKeyUp={ this.handleKeyUp }
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
          classes={ classes }
          errorHintHTML={ errorHintHTML }
          showHint={ showHint }
          closeHint={ () => this.setState({ showHint: false }) }
        />
      </div>
    )
  }

}

export default withStyles(styles, { withTheme: true })(EditorOutput)
