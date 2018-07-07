import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../common/animations/SlideInOut'
import KiwiTextField from '../../common/form/KiwiTextField'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import { required } from '../../utils/validationUtils'

const styles = theme => ({
  header: {
    margin: '0 0 5px 0'
  },
  root: {
    position: 'relative'
    , width: '900px'
    , height: '100%'
    , margin: '0 auto'
  },
  right: {
    position: 'absolute'
    , right: 0
    , top: '50%'
    , marginTop: '-150px'
    , height: '300px'
    , width: '65%'
    , textAlign: 'center'
  },
  left: {
    position: 'absolute'
    , left: 0
    , backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/KidCarl_xly3ot.svg)'
    , backgroundPosition: 'center'
    , backgroundRepeat: 'no-repeat'
    , height: '100%'
    , width: '35%'
  },
  button: {
    display: 'block'
  }
})

class Slide extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {

  }

  render() {
    const { classes, handleSubmit, hasSubmitFailed, submitButtonProps } = this.props

    return (
      <SlideInOut>
        <div className={ classes.root }>
          <div className={ classes.left } />
          <div className={ classes.right }>
            <h2 className={ classes.header }>
              Great! Now, you can choose a new username!
            </h2>
            <h4 className={ classes.header }>
              What do you want to be called here on Tech Island?
            </h4>
            <Field
              name='newUsername'
              label='New Username'
              component={ KiwiTextField }
              style={ { width: '80%', margin: 'auto' } }
              validate={ [ required ] }
            />
            <SubmitButton
              text="Let's go!"
              { ...submitButtonProps }
              onClick={ handleSubmit }
              className={ classes.button }
            />
            <ResultMessage
              { ...this.props }
              submitFailed={ hasSubmitFailed }
            />
          </div>
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Slide)
