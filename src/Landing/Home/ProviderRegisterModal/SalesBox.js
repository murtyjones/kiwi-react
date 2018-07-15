import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  container: {
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    color: '#624F8F'
  },
  cost: {
    color: '#CCC',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  usd: {
    color: '#66cc52'
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
