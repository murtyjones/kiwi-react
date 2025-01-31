import React, { Component } from 'react'
import cns from 'classnames'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import findIndex from 'lodash/findIndex'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOutline from '@material-ui/icons/LockOutline'

import SlideInOut from '../../../../common/animations/SlideInOut'
import { studentSignInSlide, studentSlides } from '../slides'
import KiwiTextField from '../../../../common/form/KiwiTextField'
import { required } from '../../../../utils/validationUtils'
import StudentForgotPassword from './StudentForgotPassword'
import StudentSignUp from './StudentSignUp'

const styles = theme => ({
  needAccountLink: {
    display: 'block',
    margin: '5px 0 10px 0',
    fontSize: '10pt'
  },
  forgotPasswordLink: {
    display: 'block',
    padding: '2px 0',
    fontSize: '10pt'
  }
})

class StudentSignIn extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToSlide: T.func.isRequired,
    classes: T.object.isRequired
  }

  render() {
    const { classes, goToSlide } = this.props
    const forgotPasswordIndex = findIndex(studentSlides, { Component: StudentForgotPassword })
    const studentSignUpIndex = findIndex(studentSlides, { Component: StudentSignUp })

    return (
      <SlideInOut show={ true }>
        <div className={ cns('loginModalForm-slide', classes.container) }>
          <Link to='#'
            className={ classes.needAccountLink }
            onClick={ () => goToSlide(studentSignUpIndex) }
          >
            I don't have an account!
          </Link>
          <Field
            name={ studentSignInSlide.names[0] }
            label='Username'
            component={ KiwiTextField }
            StartAdornmentIcon={ AccountCircle }
            validate={ [ required ] }
          />
          <Field
            name={ studentSignInSlide.names[1] }
            type='password'
            label='Password'
            component={ KiwiTextField }
            StartAdornmentIcon={ LockOutline }
            validate={ [ required ] }
          />
          <Link
            to='#'
            className={ classes.forgotPasswordLink }
            onClick={ () => goToSlide(forgotPasswordIndex) }
          >
            I forgot my username/password!
          </Link>
        </div>
      </SlideInOut>
    )
  }
}

StudentSignIn = withRouter(StudentSignIn)

export default withStyles(styles, { withTheme: true })(StudentSignIn)
