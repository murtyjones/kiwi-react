import React, { Component } from 'react'
import * as T from 'prop-types'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from 'react-router-dom/Link'
import withRouter from 'react-router-dom/withRouter'

import { signout } from '../../../../actions'
import SlideInOut from '../../../../common/animations/SlideInOut'
import withStyles from '@material-ui/core/styles/withStyles'
import config from 'config'

const styles = theme => ({
  table: {
    width: '80%',
    margin: '0 auto'
  },
  '@global': {
    'th, td': {
      padding: '0 !important',
      textAlign: 'center !important'
    }
  }
})

class Success extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
    providees: T.object.isRequired,
    classes: T.object.isRequired,
    signout: T.func.isRequired,
    history: T.object.isRequired,
  }

  redirectToOnboarding = () => {
    this.props.history.push('/')
  }

  render() {
    const { providees, classes } = this.props

    const monthlySubscription = 30
    const numberOfStudents = providees.length
    const accountOrAccounts = numberOfStudents > 1 ? 'accounts' : 'account'
    const areOrIs = numberOfStudents > 1 ? 'are' : 'is'
    const studentOrStudents = numberOfStudents > 1 ? 'students' : 'student'

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <h5>
            Your student { accountOrAccounts } { areOrIs } created! Your { studentOrStudents } can
            get started at&nbsp;
            <Link to='/student' onClick={ this.props.signout } target='_blank'>
              { config.shortHost }
            </Link>
          </h5>
          <Table className={ classes.table }>
            <TableHead>
              <TableRow>
                <TableCell>Temporary Username</TableCell>
                <TableCell>Temporary Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { providees.map((student, i) =>
                <TableRow key={ i }>
                  <TableCell>{ student.username }</TableCell>
                  <TableCell>{ student.password }</TableCell>
                </TableRow>
              ) }
            </TableBody>
          </Table>
        </div>
      </SlideInOut>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  }
}

Success = connect(null, mapDispatchToProps)(Success)

export default withRouter(withStyles(styles, { withTheme: true })(Success))
