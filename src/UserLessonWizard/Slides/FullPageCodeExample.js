import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import template from 'es6-template-strings'

import { slideContentFlexibleHeight, titleStyle, example as exampleStyle } from './commonSlideStyles'
import { createVariableNameValuePair } from '../../utils/templateUtils'
import SpeechBubble from '../SpeechBubble'

const styles = {
  fullPageExampleContainer: {
    position: 'relative' // has to be done so that child pos:abs will work
    , border: '1px solid #CCC'
    , borderRadius: '15px'
    , padding: '5px'
    , paddingLeft: '20px'
    , marginTop: '20px'
  },
  container: {
    width: '600px'
    , height: '600px'
    , position: 'absolute'
    , top: '50%'
    , left: '50%'
    , marginLeft: '-300px'
    , marginTop: '-300px'
    , paddingTop: '5%'
  },
  exampleLabel: {
    display: 'inline-block'
    , position: 'absolute'
    , top: '-10px'
    , left: '15px'
    , background: '#FFFFFF'
    , padding: '2px'
    , paddingLeft: '10px'
    , paddingRight: '10px'
    , fontWeight: 'bold'
    , fontSize: '14pt'
  },
  fullPageExplanationStyle: {

  }
}

class FullPageCodeExample extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    slideData: T.object
    , className: T.string
  }

  render() {
    const { slideData, className, variablesWithUserValues, globalColors } = this.props
    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const example = template(slideData.example, variableValues)

    const { characterUrl } = slideData

    return (
      <div id='exampleContainer' style={ styles.container } className={ className }>
        { characterUrl &&
        <img
          src={ characterUrl }
          style={ {
            position: 'absolute',
            width: '200px',
            left: '-205px'
          } }
        />
        }
        <SpeechBubble
          label={ slideData.exampleLabel }
          htmlContent={ example }
          isCodeExample={ true }
        />
      </div>
    )
  }
}

export default FullPageCodeExample
