import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

import cns from 'classnames'

import './overrides.css'

const styles = {
  container: {
    fontFamily: 'Arvo'
    , position: 'fixed'
    , bottom: 'calc(60px + 10vh)' // includes space for top bar
    , right: 0
    , width: '400px'
    , minHeight: '180px'
    , zIndex: '1000' // makes selecting with the inspector easier
  },
  h4: {
    textDecoration: 'underline'
    , position: 'absolute'
    , bottom: 0
    , cursor: 'pointer'
  }
}

class ResultCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideAnswerData, currentLessonSlide, toggleShowResultCard, showResultCard = false } = this.props
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
        classNames='slideRight'
        timeout={ 300 }
        mountOnEnter={ true }
        unmountOnExit={ true }
      >
        <div
          className={cns('resultCard', isAnsweredCorrectly ? 'correct' : 'incorrect')}
          style={ styles.container }
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