import React, { Component } from 'react'
import Button from './Button'
import renderIf from 'render-if'

import { introStart, introSave, introDemo, introResources } from './introduction'

const styles = {
  base: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '6px',
    marginRight: '10px',
    marginBottom: '6px',
  },
  textInput: {
    marginRight: '10px',
    color: 'black',
  },
  textInputInput: {
    color: 'black',
  },
}

class EditorControls extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  placeHolder = () => {

  }

  render(){
    const { runCode, runIntro, showResources, isLoggedIn = true } = this.props
    return (
      <div style={ styles.base }>
        <Button
          label={ 'Run' }
          style={ styles.button }
          onClick={ runCode }
          dataIntro={ introStart }
          dataStep={ 2 }
        />
        { renderIf(isLoggedIn)(
          <span>
            <Button
              label={ "SAVE" }
              style={ styles.button }
              dataIntro={ introSave }
              dataStep={ 4 }
              onClick={ this.props.handleSave }
            />
          </span>
        ) }
        <Button
          label={ "How to use this Kiwi Editor" }
          style={ styles.button }
          onClick={ runIntro }
          dataIntro={ introDemo }
          dataStep={ 6 }
        />
        <Button
          label={ "Basic Tips" }
          style={ styles.button }
          onClick={ showResources }
          secondary={ true }
          dataIntro={ introResources }
          dataStep={ 5 }
        />
      </div>
    )
  }
}

export default EditorControls
