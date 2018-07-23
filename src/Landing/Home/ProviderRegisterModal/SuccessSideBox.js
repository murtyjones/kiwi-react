import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import cns from 'classnames'

const styles = theme => ({
  h3: {
    textAlign: '-webkit-center',
    color: '#2E2860',
    margin: 0,
    position: 'relative',
    top: '30px'
  },
  select: {
    height: '100%',
    boxShadow: 'none'
  },
  right: {
    background: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/PapaCarl_cehuft.svg) no-repeat',
    backgroundPosition: 'center 90%',
    backgroundSize: 'auto 80%'
  }
})

const SuccessSideBox = ({ classes }) =>
  <Paper
    className={ cns(classes.select, classes.right) }
  >
    <h3 className={ classes.h3 }>
      Success!
    </h3>
  </Paper>

export default withStyles(styles, { withTheme: true })(SuccessSideBox)
