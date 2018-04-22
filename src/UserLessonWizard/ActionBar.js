import React, { Component } from 'react'
import cns from 'classnames'
import { has } from 'lodash'

import isNumeric from '../utils/isNumeric'

const styles = {
  button: {
    display: 'inline-block'
    , position: 'absolute'
    , width: '140px'
    , height: '40px'
    , top: '11px'
    , borderRadius: '98px'
    , textAlign: 'center'
    , fontWeight: 'bold'
    , lineHeight: '40px'
  },
  prevButton: {
    left: '20px'
  },
  nextButton: {
    right: '20px'
    , color: '#000000'
    , backgroundColor: '#FFFFFF'
  },
  checkAnswerButton: {
    right: '200px'
  }
}

export const PrevButton = ({ onPrevClick, globalColors }) =>
  <div
    key='prevButton'
    id='prevButton'
    className={ cns('prevButton', { 'disabled': !onPrevClick }) }
    style={ {
      ...styles.button
      , ...styles.prevButton
      , cursor: onPrevClick ? 'pointer': ''
      , backgroundColor: globalColors.tertiaryColor
      , color: globalColors.textColor
    } }
    onClick={ onPrevClick }
  >
    Previous
  </div>

export const NextButton = ({ onNextClick, globalColors }) =>
  <div
    key='nextButton'
    id='nextButton'
    className={ cns('nextButton', { 'disabled': !onNextClick }) }
    style={ {
      ...styles.button
      , ...styles.nextButton
      , cursor: onNextClick ? 'pointer': ''
      , color: globalColors.primaryColor
    } }
    onClick={ onNextClick }
  >
    Next
  </div>


export const RunCodeButton = ({ onClick }) =>
  <div
    key='checkAnswerButton'
    id='checkAnswerButton'
    className={ cns('checkAnswerButton', { 'disabled': !onClick }) }
    style={ {
      ...styles.button
      , ...styles.checkAnswerButton
      , cursor: onClick ? 'pointer': ''
    } }
    onClick={ onClick }
  >
    Run Code
  </div>
export const CheckAnswerButton = ({ onClick }) =>
  <div
    key='checkAnswerButton'
    id='checkAnswerButton'
    className={ cns('checkAnswerButton', { 'disabled': !onClick }) }
    style={ {
      ...styles.button
      , ...styles.checkAnswerButton
      , cursor: onClick ? 'pointer': ''
    } }
    onClick={ onClick }
  >
    Check Answer
  </div>


const ActionBar = ({ onRunCode, onCheckAnswer, onPrevClick, onNextClick, globalColors, slideAnswerData = {} }) => {
  let onCheckAnswerClick = has(slideAnswerData, 'answer') && onCheckAnswer ? onCheckAnswer : null

  return (
    <div
      className='actionBar'
      style={ { backgroundColor: globalColors.primaryColor } }
    >
      { onPrevClick &&
        <PrevButton onPrevClick={ onPrevClick } globalColors={ globalColors } />
      }
      { !!onRunCode &&
        <RunCodeButton onClick={ onRunCode } />
      }
      { !!onCheckAnswerClick &&
        <CheckAnswerButton onClick={ onCheckAnswerClick } />
      }
      <NextButton globalColors={ globalColors } onNextClick={ onNextClick } />
    </div>
    )
}

export default ActionBar