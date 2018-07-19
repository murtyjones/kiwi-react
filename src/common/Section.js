import React from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    border: '1px solid #CCC',
    marginBottom: 20
  },
  header: {
    backgroundColor: '#eff1f4',
    padding: '12px 20px',
    borderBottom: '1px solid #CCC',
  },
  body: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    minHeight: 100
  }
})

const Section = ({ classes, headerText, children }) =>
  <div className={ classes.root }>
    <div className={ classes.header }>{ headerText }</div>
    <div className={ classes.body }>
      { children }
    </div>
  </div>

Section.propTypes = {
  classes: T.object.isRequired,
  headerText: T.string.isRequired,
  children: T.any.isRequired
}

export default withStyles(styles)(Section)