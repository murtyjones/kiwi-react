import React, { Component } from 'react'
import { Field } from 'redux-form'
import renderRichTextEditor from '../../../common/renderRichTextEditor'
import renderTextField from '../../../common/renderTextField'

const styles = {
  sideA: {
    width: '50%',
    display: 'inline-block'
  },
  sideB: {
    width: '50%',
    display: 'inline-block'
  }
}

class HalfCodeHalfText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef } = this.props
    return (
      <div>
        <div style={ styles.sideA }>
          <Field
            name={ `${slideRef}.slideContent` }
            component={ renderRichTextEditor }
          />
        </div>
        <div style={ styles.sideA }>
          <Field
            name={ 'title' }
            label={ 'Title' }
            component={ renderTextField }
            multiLine={ true }
            rows={ 20 }
          />
        </div>
      </div>
    )
  }
}

export default HalfCodeHalfText