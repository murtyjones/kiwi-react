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
    , minHeight: '180px'
    , zIndex: '1001' /* should be behind of the resultCard*/
  },
  h4: {
    textDecoration: 'underline'
    , marginTop: '20px'
    , cursor: 'pointer'
  }
}

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
          className={cns('resultCard', isAnsweredCorrectly ? 'correct' : 'incorrect')}
          style={ {
            ...styles.container
            , paddingBottom: includePaddingForActionBar ? '60px' : 0
          } }
        >
          <h2>{ headline }</h2>
          <h3>{ explanation }</h3>
          <h4
            style={ styles.h4 }
            onClick={ toggleShowResultCard }
          >
            Got it!
          </h4>
        </div>
      </CSSTransition>
    )
  }
}


export default ResultCard