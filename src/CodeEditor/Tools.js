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
    , width: '160px'
    , height: '200px'
    , bottom: '20px'
    , left: 'calc(50% - 160px)'
    , zIndex: 1000
  },
  circle: {
    borderRadius: '50%'
    , position: 'absolute'
    , width: '44px'
    , height: '44px'
    , backgroundColor: '#edecec'
    , border: `1px ${buttonColor} solid`
    , cursor: 'pointer'
    , boxShadow: '3px 3px 10px #cccccc'
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
    , display: 'inline'
    , overflow: 'hidden'
  },
  saveButtonLabel: {
    bottom: '105px'
  },
  runButtonLabel: {
    bottom: '35px'
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
    , onRun: T.func
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
            className='toolbarLabel bringLabelOut'
            style={ {
              ...styles.label
              , ...styles.saveButtonLabel
              , right: isSaveLabelVisible ? '75px': '20px'
            } }
          >
            { isSaveLabelVisible ? 'SAVE CODE' : '' }
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
            className='toolbarLabel bringLabelOut'
            style={ {
              ...styles.label
              , ...styles.runButtonLabel
              , right: isRunLabelVisible ? '75px': '20px'
            } }
          >
            { isRunLabelVisible ? 'RUN CODE' : '' }
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