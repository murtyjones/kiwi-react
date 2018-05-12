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
    const prompt = template(slideData.prompt, variableValues)

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
          dangerouslySetInnerHTML={ { __html: prompt } }
        />
      </div>
    )
  }
}

export default FullPageText