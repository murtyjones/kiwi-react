import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  container: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
    height: '100%',
    background: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/KidCarl_xly3ot.svg)'
  }
})

const StudentSideBox = ({ classes }) =>
  <div className={ classes.container } />

export default withStyles(styles, { withTheme: true })(StudentSideBox)
