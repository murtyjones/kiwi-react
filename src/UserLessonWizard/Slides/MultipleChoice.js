import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { titleStyle, slideContentFullHeight } from './commonSlideStyles'
import cns from 'classnames'

import './overrides.css'

const styles = {
  instructions: {
    overflow: 'hidden'
  }
}

const Choices = ({ slideData, input, setChosenAnswerIndex }) =>
  <div className='choices'>
    { slideData.choices.map((choice, i) => {
      const selected = input.value === i
      return (
        <div
          key={ i }
          className={ cns('choice', `choice${i}`, { 'selected': selected }) }
          onClick={ () => {
            if(!selected) input.onChange(i)
            setChosenAnswerIndex(i)
          } }
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
    const { slideData, className, globalColors, setChosenAnswerIndex, input } = this.props

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
          dangerouslySetInnerHTML={ { __html: slideData.instructions } }
        />
        <Choices
          slideData={ slideData }
          input={ input }
          setChosenAnswerIndex={ setChosenAnswerIndex }
        />
      </div>
    )
  }
}

export default FullPageText