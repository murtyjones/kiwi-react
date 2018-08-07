import React from 'react'
import * as T from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import get from 'lodash/get'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  table: {
    width: '80%',
    margin: '15px auto'
  },
  '@global': {
    'th, td': {
      textAlign: 'center !important'
    }
  }
})

const ProspectiveSubscriptionTable = ({ classes, providees, monthlySubscription = 30 }) => {
  return (
    <Table className={ classes.table }>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Monthly Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { providees.map((student, i) => {
          const firstName = get(student, 'firstName', '')
          const username = get(student, 'username', '')
          const displayName = firstName ? firstName : username
          return (
            <TableRow key={ i }>
              <TableCell>{ displayName }</TableCell>
              <TableCell>({monthlySubscription} USD /mo)</TableCell>
            </TableRow>
          )
        }
        ) }
      </TableBody>
    </Table>
  )
}


ProspectiveSubscriptionTable.propTypes = {
  classes: T.object,
  providees: T.array,
  monthlySubscription: T.number
}


export default withStyles(styles, { withTheme: true })(ProspectiveSubscriptionTable)
