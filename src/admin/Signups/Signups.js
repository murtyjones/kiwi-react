import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from 'config'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import uniqBy from 'lodash/uniqBy'


import ApiFetch from '../../utils/ApiFetch'

const getManyMessages = async (params) => {
  try {
    const options = {
      method: 'GET'
    }
    const success = await ApiFetch('https://api.kiwicompute.com/v1/messages', options)
    return success
  } catch (err) {
    console.log(err)
    throw err
  }

}

class Signups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  static propTypes = {

  }

  async UNSAFE_componentWillMount() {
    const messages = await getManyMessages()
    this.setState({ messages})
  }

  render() {
    const { messages } = this.state

    const dedupedMessages = uniqBy(messages, 'email')

    return (
      <Table>
        <TableHead className='subscription-head'>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Is Subscribed?</TableCell>
            <TableCell>Signup Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { dedupedMessages.map((each, i) => {
            return (
              <TableRow
                hover
                key={ i }
              >
                <TableCell>{ each.name }</TableCell>
                <TableCell>{ each.email }</TableCell>
                <TableCell style={ { paddingLeft: '70px' } }>
                  { each.subscribe ?
                    <span style={{ color: 'green' }}>✓</span>
                  : <span style={{ color: 'red' }}>X</span>
                  }
                </TableCell>
                <TableCell>{ moment(each.createdAt).format('MMMM Do YYYY') }</TableCell>
              </TableRow>
            )
          }) }
        </TableBody>
      </Table>
    )
  }
}


export default Signups
