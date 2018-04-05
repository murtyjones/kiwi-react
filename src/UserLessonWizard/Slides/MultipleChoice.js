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
    const { slideData, className, globalColors } = this.props
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
        <div className='choices'>
          { slideData.choices.map((e, i) =>
            <div
              className={ cns('choice', `choice${i}`) }
              onClick={ () => this.props.setChosenAnswerIndex(i) }
            >
              { e }
            </div>
          ) }
        </div>
      </div>
    )
  }
}

export default FullPageText