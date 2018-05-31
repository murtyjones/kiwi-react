import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import template from 'es6-template-strings'

import { titleStyle, slideContentFlexibleHeight } from './commonSlideStyles'
import { createVariableNameValuePair } from '../../utils/templateUtils'

const styles = {
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
  instructions: {
    overflow: 'hidden'
  }
}

class FullPageText extends PureComponent {
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
    const instructions = template(slideData.instructions, variableValues)

    return (
      <div
        className={ className }
        style={ styles.container }
      >
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
          key='instructions'
          id='instructions'
          className='instructions'
          style={ styles.instructions }
          dangerouslySetInnerHTML={ { __html: instructions } }
        />
      </div>
    )
  }
}

export default FullPageText
