import React, { Component } from 'react'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'

import SlideInOut from '../../../../common/animations/SlideInOut'


const styles = theme => ({
  container: {

  }
})

class StudentForgotPassword extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut show={ true }>
        <div className={ cns('loginModalForm-slide', classes.container) }>
          Okay! Let your parent know that you forgot your password
          so that they can give you a new one!
        </div>
      </SlideInOut>
    )
  }
}

StudentForgotPassword = withRouter(StudentForgotPassword)

export default withStyles(styles, { withTheme: true })(StudentForgotPassword)
