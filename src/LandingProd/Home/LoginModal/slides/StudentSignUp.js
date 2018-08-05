import React, { Component } from 'react'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import withRouter from 'react-router-dom/withRouter'

import SlideInOut from '../../../../common/animations/SlideInOut'


const styles = theme => ({
  container: {

  }
})

class StudentSignUp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut show={ true }>
        <div className={ cns('loginModalForm-slide', classes.container) }>
          For now, only your parents can sign up. Ask them to stop by
          kiwicompute.com and help make your account!
        </div>
      </SlideInOut>
    )
  }
}

StudentSignUp = withRouter(StudentSignUp)

export default withStyles(styles, { withTheme: true })(StudentSignUp)
