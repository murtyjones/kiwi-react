import React, { Component } from 'react'
import cns from 'classnames'
import { has } from 'lodash'

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)

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
  actionButton: {
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


export const ActionButton = ({ onAction, actionButtonText }) =>
  <div
    key='actionButton'
    id='actionButton'
    className={ cns('actionButton', { 'disabled': !onAction }) }
    style={ {
      ...styles.button
      , ...styles.actionButton
      , cursor: onAction ? 'pointer': ''
    } }
    onClick={ onAction }
  >
    { actionButtonText }
  </div>


const ActionBar = ({ onRunCode, onCheckAnswer, onPrevClick, onNextClick, globalColors, slideAnswerData = {} }) => {
  let onAction, actionButtonText
  if(onRunCode) {
    onAction = onRunCode
    actionButtonText = 'Run Code'
  } else if(onCheckAnswer) {
    onAction = has(slideAnswerData, 'answer') && isNumeric(slideAnswerData.answer) ? onCheckAnswer : null
    actionButtonText = 'Check Answer'
  }

  return (
    <div
      className='actionBar'
      style={ {
        backgroundColor: globalColors.primaryColor
      } }
    >
      { onPrevClick &&
        <PrevButton
          onPrevClick={ onPrevClick }
          globalColors={ globalColors }
        />
      }
      { !!actionButtonText &&
        <ActionButton
          onAction={ onAction }
          actionButtonText={ actionButtonText }
        />
      }
      <NextButton
        globalColors={ globalColors }
        onNextClick={ onNextClick }
      />
    </div>
    )
}

export default ActionBar