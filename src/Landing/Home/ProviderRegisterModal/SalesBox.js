import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { purple, oceanBlue, darkGrey } from '../../../colors'

const styles = theme => ({
  container: {
    fontSize: '12.5pt',
    padding: '20px'
  },
  header: {
    textAlign: '-webkit-center',
    color: purple
  },
  cost: {
    color: darkGrey,
    fontWeight: 'bold',
    textAlign: '-webkit-center',
    marginTop: 10
  },
  usd: {
    color: oceanBlue
  },
  '@global': {
    ul: {
      // listStyleType: 'none'
    },
    li: {
      margin: '10px 0',
      listStyle: "– "
    }
  }
})

const SalesBox = ({ classes }) =>
  <div className={ classes.container }>
    <h2 className={ classes.header }>Join Kiwi To:</h2>
    <ul>
      <li>Help your child engage digitally in a fun and healthy way</li>
      <li>Use a trusted curriculum for coding education</li>
      <li>Give your student the digital support needed to become a coder</li>
    </ul>
    <h3 className={ classes.header } style={ { marginBottom: 0 } }>
      Give your student the skills to be digitally creative
    </h3>
    <div className={ classes.cost }>
      <span className={ classes.usd }>30 USD</span> / month
    </div>
  </div>

export default withStyles(styles, { withTheme: true })(SalesBox)
