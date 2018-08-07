import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { purple, oceanBlue, darkGrey } from '../../../colors'

const styles = theme => ({
  container: {
    fontSize: '12.5pt',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    color: purple
  },
  bottomText: {
    textAlign: 'center',
    color: purple,
    marginTop: 30,
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
    <h3 className={ classes.header }>Start your 1-week free trial to:</h3>
    <ul>
      <li>Help your child engage digitally in a fun and healthy way</li>
      <li>Use a trusted curriculum for coding education</li>
      <li>Give your student the digital support needed to become a coder</li>
    </ul>
    <h4 className={ classes.bottomText } style={ { marginBottom: 0 } }>
      Give your student the skills to be digitally creative
    </h4>
  </div>

export default withStyles(styles, { withTheme: true })(SalesBox)
