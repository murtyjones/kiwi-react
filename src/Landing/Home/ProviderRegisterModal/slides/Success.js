import React, { Component } from 'react'
import * as T from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import SlideInOut from '../../../../common/animations/SlideInOut'
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  table: {
    width: '80%',
    margin: '0 auto'
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
  }

  render() {
    const { providees, classes } = this.props

    const monthlySubscription = 30
    const numberOfStudents = providees.length
    const subscriptionOrSubs = numberOfStudents > 1
      ? 'subscriptions'
      : 'subscription'

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <h5>
            Thanks for subscribing! Please review and confirm your { subscriptionOrSubs } below.
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
                <TableRow hover key={ i }>
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

export default withStyles(styles, { withTheme: true })(Success)
