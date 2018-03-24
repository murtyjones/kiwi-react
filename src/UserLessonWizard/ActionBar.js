import React, { Component } from 'react'
import cns from 'classnames'



const styles = {
  button: {
    display: 'inline-block'
    , position: 'absolute'
    , width: '130px'
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
  runCodeButton: {
    right: '200px'
    , color: '#FFFFFF'
    , backgroundColor: '#9ABF42'
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
    Go Back
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


export const RunCodeButton = ({ onRunCode }) =>
  <div
    key='runCodeButton'
    id='runCodeButton'
    className={ cns('runCodeButton', { 'disabled': !onRunCode }) }
    style={ {
      ...styles.button
      , ...styles.runCodeButton
      , cursor: onRunCode ? 'pointer': ''
    } }
    onClick={ onRunCode }
  >
    Run Code
  </div>


const ActionBar = ({ onRunCode, onPrevClick, onNextClick, globalColors }) =>
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
    { onRunCode &&
      <RunCodeButton onRunCode={ onRunCode } />
    }
    <NextButton
      globalColors={ globalColors }
      onNextClick={ onNextClick }
    />
  </div>

export default ActionBar