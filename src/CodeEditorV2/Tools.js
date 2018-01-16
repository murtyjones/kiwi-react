import React, { Component } from 'react'
import * as T from 'prop-types'
import PlayArrow  from 'material-ui-icons/PlayArrow'
import Save  from 'material-ui-icons/Save'

const buttonColor = '#4D4D4D'
  , saveSize = 22
  , runSize = 34


const styles = {
  container: {
    position: 'absolute'
    , width: '50%'
    , height: '200px'
    , bottom: '20px'
  },
  circle: {
    borderRadius: '50%'
    , position: 'absolute'
    , width: '44px'
    , height: '44px'
    , backgroundColor: '#FFFFFF'
    , border: `1px ${buttonColor} solid`
  },
  saveCircle: {
    bottom: '90px'
    , right: '20px'
  },
  runCircle: {
    bottom: '20px'
    , right: '20px'
  },
  button: {
    color: buttonColor
    , cursor: 'pointer'
    , verticalAlign: 'middle'
    , position: 'absolute'
    , top: '50%'
    , left: '50%'
  },
  saveButton: {
    marginTop: `-${saveSize/2}px`
    , marginLeft: `-${saveSize/2}px`
    , width: `${saveSize}px`
    , height: `${saveSize}px`
  },
  runButton: {
    marginTop: `-${runSize/2}px`
    , marginLeft: `-${runSize/2}px`
    , width: `${runSize}px`
    , height: `${runSize}px`

  },
  label: {
    position: 'absolute'
    , textTransform: 'uppercase'
    , fontSize: '11pt'
  },
  saveButtonLabel: {
    bottom: '105px'
    , right: '75px'
  },
  runButtonLabel: {
    bottom: '35px'
    , right: '75px'
  }
}

const RunButton = ({ className, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <div
      className={ className }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      style={ { ...styles.circle, ...styles.runCircle } }
      onClick={ onClick }
    >
      <PlayArrow
        onMouseEnter={ onMouseEnter }
        style={ { ...styles.button, ...styles.runButton } }
        onClick={ (e) => e.preventDefault() && onClick }
      />
    </div>
  )
}

const SaveButton = ({ className, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <div
      className={ className }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      style={ { ...styles.circle, ...styles.saveCircle } }
      onClick={ onClick }
    >
      <Save
        onMouseEnter={ onMouseEnter }
        style={ { ...styles.button, ...styles.saveButton } }
        onClick={ (e) => e.preventDefault() && onClick }
      />
    </div>
  )
}

class Tools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSaveLabelVisible: false
      , isRunLabelVisible: false
    }
  }

  static propTypes = {
    className: T.string
    , onSave: T.func
    , onRun: T.func.isRequired
  }

  mouseAction = (newState) => {
    this.setState(newState)
  }

  render() {
    const { onSave, onRun } = this.props
    const { isSaveLabelVisible, isRunLabelVisible } = this.state
    return (
      <div style={ styles.container }>

        { onSave && [
          <div
            key='saveLabel'
            className='toolbarLabel'
            style={ {
              display: isSaveLabelVisible ? 'inline': 'none'
              , ...styles.label
              , ...styles.saveButtonLabel
            } }
          >
            SAVE CODE
          </div>
          ,
          <SaveButton
            key='saveButton'
            className='toolbarButton'
            onMouseEnter={ () => this.mouseAction({ isSaveLabelVisible: true }) }
            onMouseLeave={ () => this.mouseAction({ isSaveLabelVisible: false }) }
            onClick={ onSave }
          />
        ]}

        { onRun && [
          <div
            key='runLabel'
            className='toolbarLabel'
            style={ {
              display: isRunLabelVisible ? 'inline': 'none'
              , ...styles.label
              , ...styles.runButtonLabel
            } }
          >
            RUN CODE
          </div>
          ,
          <RunButton
            key='runButton'
            className='toolbarButton'
            onMouseEnter={ () => this.mouseAction({ isRunLabelVisible: true }) }
            onMouseLeave={ () => this.mouseAction({ isRunLabelVisible: false }) }
            onClick={ onRun }
          />
        ]}

      </div>
    )
  }
}

export default Tools