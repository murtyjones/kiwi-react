import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../common/animations/SlideInOut'
import KiwiTextField from '../../common/form/KiwiTextField'
import SubmitButton from '../../common/form/SubmitButton'
import ResultMessage from '../../common/form/ResultMessage'
import { required } from '../../utils/validationUtils'

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531003742/Onboarding%20Final/intro_onboarding_slide.svg)',
    backgroundSize: '100%',
    backgroundPositionY: 'center'
  },
  textBox: {
    position: 'absolute'
    , right: '2%'
    , top: '50%'
    , marginTop: '-150px'
    , width: '50%'
    , maxWidth: '600px'
    , textAlign: 'center'
    , '-webkit-text-align': 'center'
    , backgroundColor: '#FFF'
    , border: '3px solid #330000'
    , borderRadius: '15px'
    , padding: '15px'
  },
  button: {
    display: 'block'
  },
  '@global': {
    'h1, h2, h3, h4, h5, h6': {
      margin: '0 0 15px 0',
      color: '#330000'
    }
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
      <div className={ classes.root }>
        <SlideInOut>
          <div className={ classes.textBox }>
            <h2>
              Let's get started! What's your username and password?
            </h2>
            <h4>
              If you're unsure, ask your parent!
            </h4>
            <Field
              name='username'
              label='Username'
              component={ KiwiTextField }
              addlInputLabelProps={ { shrink: true } }
              validate={ [ required ] }
            />
            <Field
              name='tempPassword'
              label='Password'
              component={ KiwiTextField }
              type='password'
              addlInputLabelProps={ { shrink: true } }
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
        </SlideInOut>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Slide)
