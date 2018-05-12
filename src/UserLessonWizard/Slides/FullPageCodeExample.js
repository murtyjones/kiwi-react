import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import template from 'es6-template-strings'

import { slideContentFlexibleHeight, titleStyle, example as exampleStyle } from './commonSlideStyles'
import { createVariableNameValuePair } from '../../utils/templateUtils'

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
    , setToViewed: T.func.isRequired
  }

  componentDidMount() {
    this.props.setToViewed()
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input.isViewed) {
      nextProps.setToViewed()
    }
  }

  render() {
    const { slideData, className, variablesWithUserValues, globalColors } = this.props
    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const explanation = template(slideData.explanation, variableValues)
    const example = template(slideData.example, variableValues)

    return (
      <div style={ styles.container } className={ className }>
        <div
          key='title'
          id='title'
          style={ {
            ...titleStyle
            , color: globalColors.quaternaryColor
          } }
        >
          { slideData.title }
        </div>
        <div
          key='fullPageExplanation'
          id='fullPageExplanation'
          className='fullPageExplanation'
          style={ styles.fullPageExplanationStyle }
          dangerouslySetInnerHTML={ { __html: explanation } }
        />
        <div
          key='fullPageExampleContainer'
          id='fullPageExampleContainer'
          className='fullPageExampleContainer'
          style={ styles.fullPageExampleContainer }
        >
          <div
            key='exampleLabel'
            id='exampleLabel'
            className='exampleLabel'
            style={ styles.exampleLabel }
          >
            Example
          </div>
          <div
            key='fullPageExample'
            id='fullPageExample'
            className='fullPageExample'
            style={ exampleStyle }
            dangerouslySetInnerHTML={ { __html: example } }
          />
        </div>
      </div>
    )
  }
}

export default FullPageCodeExample