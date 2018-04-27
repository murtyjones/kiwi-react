import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

import cns from 'classnames'

import './overrides.css'

const styles = {
  container: {
    fontFamily: 'Arvo'
    , position: 'fixed'
    , bottom: 0
    , left: 0
    , right: 0
    , zIndex: '1001' /* should be behind of the resultCard*/
  },
  close: {
    textDecoration: 'underline'
    , cursor: 'pointer'
    , position: 'absolute'
    , right: '10px'
    , top: '10px'
    , color: 'black'
  }
}

const Dash = () => <div style={ { display: 'inline', padding: '0 5px' } }> – </div>

const Close = ({ onClick }) => <div className='x-sm x-black' style={ styles.close } onClick={ onClick } />

class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideAnswerData, currentLessonSlide, toggleShowResultCard, includePaddingForActionBar = true, showResultCard = false } = this.props
    const { successHeadline, successExplanation, failureHeadline, failureExplanation } = currentLessonSlide
    const { isAnsweredCorrectly } = slideAnswerData

    let headline = isAnsweredCorrectly ? 'Correct!' : 'Wrong!'
    let explanation
    if(isAnsweredCorrectly && successHeadline && successExplanation) {
      headline = successHeadline
      explanation = successExplanation
    } else if(!isAnsweredCorrectly && failureHeadline && failureExplanation) {
      headline = failureHeadline
      explanation = failureExplanation
    }


    return (
      <CSSTransition
        in={ showResultCard }
        classNames='slideUp'
        timeout={ 300 }
        mountOnEnter={ true }
        unmountOnExit={ true }
      >
        <div
          className={ cns('resultCardContainer', isAnsweredCorrectly ? 'correct' : 'incorrect') }
          style={ {
            ...styles.container
            , paddingBottom: includePaddingForActionBar ? '60px' : 0
          } }
        >
          <div className='resultCard'>
            <p className='result'>
              <div className='headline'>{ headline }</div>
              <Dash />
              <div className='explanationOrHint'>
                {
                  slideAnswerData.hintToDisplay
                    ? slideAnswerData.hintToDisplay
                    : explanation
                }
              </div>
            </p>
          </div>
          <Close onClick={ toggleShowResultCard } />
        </div>
      </CSSTransition>
    )
  }
}


export default ResultCard