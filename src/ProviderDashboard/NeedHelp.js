import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-router-dom/Link'
import { white } from '../colors'

const styles = () => ({
  root: {
    position: 'fixed',
    bottom: 10,
    right: 10,
    background: white,
    fontSize: 13,
    border: '1px solid #CCC',
    padding: '5px 10px',
    borderRadius: 50
  }
})

let NeedHelp = ({ classes }) =>
  <div className={ classes.root }>
    Need help? E-mail us at <a href='mailto:support@kiwicompute.com'>support@kiwicompute.com</a>
  </div>

NeedHelp.propTypes = {
  classes: T.object.isRequired
}

NeedHelp = withStyles(styles, { withTheme: true })(NeedHelp)

export default NeedHelp