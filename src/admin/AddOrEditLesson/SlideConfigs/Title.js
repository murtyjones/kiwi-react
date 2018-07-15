import React, { Component } from 'react'
import { Field } from 'redux-form'
import KiwiTextField from '../../../common/form/KiwiTextField'

const styles = {
  container: {
    contentAlign: 'top'
  },
  half: {
    width: '50%',
    display: 'inline-block'
  },
  editorStyle: {
    height: '500px'
  },
  label: {
    textAlign: 'center'
  },
  textArea: {
    border: '1px solid #ccc'
    , height: '500px'
    , width: '100%'
  }
}

class Title extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { slideRef } = this.props
    return (
      <div style={ styles.container }>
        <Field
          name={ `${slideRef}.title` }
          label='Title'
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.subtitle` }
          placeholder={ 'Subtitle' }
          component={ KiwiTextField }
        />
        <Field
          name={ `${slideRef}.iconUrl` }
          placeholder={ 'Link to Icon URL' }
          component={ KiwiTextField }
        />
      </div>
    )
  }
}

export default Title