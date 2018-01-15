import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import { slideContent, titleStyle, example } from './commonSlideStyles'

const styles = {
  exampleContainer: {
    position: 'relative' // has to be done so that child pos:abs will work
    , border: '1px solid #CCC'
    , borderRadius: '15px'
    , padding: '5px'
    , paddingLeft: '20px'
    , marginTop: '20px'
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
  explanationStyle: {

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
    const { slideData, className } = this.props
    return (
      <div style={ slideContent } className={ className }>
        <div
          key='title'
          id='title'
          style={ titleStyle }
        >
          { slideData.title }
        </div>
        <div
          key='explanation'
          id='explanation'
          style={ styles.explanationStyle }
          dangerouslySetInnerHTML={ { __html: slideData.explanation } }
        />
        <div key='exampleContainer' style={ styles.exampleContainer }>
          <div key='exampleLabel' style={ styles.exampleLabel }>
            Example
          </div>
          <div
            key='fullPageExample'
            id='fullPageExample'
            className='fullPageExample'
            style={ example }
            dangerouslySetInnerHTML={ { __html: slideData.example } }
          />
        </div>
      </div>
    )
  }
}

export default FullPageCodeExample