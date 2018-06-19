import React, { Component } from 'react'
import cns from 'classnames'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../../../common/animations/SlideInOut'
import { studentSignInSlide } from '../slides'
import KiwiTextField from "../../../../common/form/KiwiTextField"


const styles = theme => ({
  container: {

  },
  image: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      background: 'url(https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clinivet.com%2Fwp-content%2Fuploads%2F2015%2F06%2FHappyDog.jpg&f=1) top left no-repeat',
      display: 'inline-block',
      width: '200px',
      boxSizing: 'border-box'
    }
  }
})

class StudentSignIn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut show={ true }>
        <div className={ cns('loginModalForm-slide', classes.container) }>
          <div className={ classes.image } />
          <Field
            name={ studentSignInSlide.names[0] }
            label='Username'
            component={ KiwiTextField }
          />
          <Field
            name={ studentSignInSlide.names[1] }
            label='Password'
            component={ KiwiTextField }
          />
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(StudentSignIn)
