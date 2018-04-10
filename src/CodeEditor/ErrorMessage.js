import React, { PureComponent, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { COMMON_ERRORS } from './commonErrors'

const styles = {
  base: {
    backgroundColor: '#F6F6F6'
    , fontFamily: 'Monospace'
    , position: 'absolute'
    , bottom: '0'
    , right: '0'
    , left: '0'
    , top: '0'
    , color: '#494949'
    , padding: '15px'
    , borderRadius: '0 10px 10px 0'
    , border: '#CCCCCC'
  },
  errorHeadline: {

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
  if(errorMsg && errorMsg.includes(each))
    hintHTML = COMMON_ERRORS[each].html
  return hintHTML
}, null)


const Hint = ({ errorHintHTML, showHint, closeHint }) =>
  <div style={ styles.hintContainer }>
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


class ErrorMessage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showHint: false
    }
  }

  render() {
    const { errorMsg, className } = this.props
    const { showHint } = this.state
    const errorHintHTML = getHint(errorMsg)

    return (
      <div className={ className } style={ styles.base }>
        { errorMsg &&
          <Fragment>
            <div style={ styles.errorHeadline }>Oops, there's an error:</div>
            <div>{ errorMsg }</div>
            <div
              style={ { cursor: 'pointer', textDecoration: 'underline' } }
              onClick={ () => this.setState({ showHint: true })}
            >
              Show hint
            </div>
          </Fragment>
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

export default ErrorMessage