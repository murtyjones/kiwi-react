import React, { Component } from 'react'
import cns from 'classnames'
import has from 'lodash/has'

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
    , border: 'none'
  },
  prevButton: {
    left: '20px'
    , color: '#FFFFFF'
    , backgroundColor: '#2e0402'
  },
  nextButton: {
    right: '20px'
    , color: '#FFFFFF'
    , backgroundColor: '#2e0402'
  },
  runCodeButton: {
    left: '50%'
    , marginLeft: '-140px'
  },
  checkAnswerButton: {
    right: '200px'
  }
}

export const PrevButton = ({ onPrevClick }) =>
  <div
    key='prevButton'
    id='prevButton'
    className={ cns('prevButton', { 'disabled': !onPrevClick }) }
    style={ {
      ...styles.button
      , ...styles.prevButton
      , cursor: onPrevClick ? 'pointer' : ''
    } }
    onClick={ onPrevClick }
  >
    Previous
  </div>

export const NextButton = ({ onNextClick }) =>
  <div
    key='nextButton'
    id='nextButton'
    className={ cns('nextButton', { 'disabled': !onNextClick }) }
    style={ {
      ...styles.button
      , ...styles.nextButton
      , cursor: onNextClick ? 'pointer' : ''
    } }
    onClick={ onNextClick }
  >
    Next
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


const ActionBar = ({ onCheckAnswer, onPrevClick, onNextClick, globalColors, includesSuccessCriteria, slideAnswerData = {} }) => {
  let onCheckAnswerClick = has(slideAnswerData, 'answer') && onCheckAnswer ? onCheckAnswer : null

  return (
    <div
      className='actionBar'
      style={ { backgroundColor: globalColors.primaryColor } }
    >
      { onPrevClick &&
        <PrevButton onPrevClick={ onPrevClick } />
      }
      { includesSuccessCriteria &&
        <CheckAnswerButton onClick={ onCheckAnswerClick } />
      }
      <NextButton onNextClick={ onNextClick } />
    </div>
  )
}

export default ActionBar
