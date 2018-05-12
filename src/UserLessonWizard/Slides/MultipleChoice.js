import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import template from 'es6-template-strings'

import { titleStyle, slideContentFullHeight } from './commonSlideStyles'
import { createVariableNameValuePair } from '../../utils/templateUtils'

import './overrides.css'

const styles = {
  instructions: {
    overflow: 'hidden'
  }
}

const Choices = ({ slideData, input }) =>
  <div className='choices'>
    { slideData.choices.map((choice, i) => {
      const selected = input.value === i
      return (
        <div
          key={ i }
          className={ cns('choice', `choice${i}`, { 'selected': selected }) }
          onClick={ () => { if(!selected) input.onChange(i) } }
        >
          { choice }
        </div>
      )
    }
    ) }
  </div>

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
    const { slideData, className, globalColors, variablesWithUserValues, input } = this.props
    const variableValues = createVariableNameValuePair(variablesWithUserValues)
    const instructions = template(slideData.instructions, variableValues)

    return (
      <div key={ className } style={ slideContentFullHeight } className={ className }>
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
        <Choices
          slideData={ slideData }
          input={ input }
        />
      </div>
    )
  }
}

export default FullPageText