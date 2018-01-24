import React from 'react'
import renderTextField from '../../common/renderTextField'

const styles = {
  container: {
    position: 'absolute'
    , top: '50%'
    , height: '50px'
    , marginTop: '-25px'
    , left: '50%'
    , width: '300px'
    , marginLeft: '-150px'
  },
  textField: {
    backgroundColor: '#FFFFFF'
    , borderRadius: '5px'
    , fontSize: '14pt'
  }
}

const renderPasswordField = props =>
  <div style={ styles.container }>
    { renderTextField({ ...props, underlineShow: false, style: styles.textField }) }
  </div>


export default renderPasswordField