import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import withoutMainNavigation from '../hocs/withoutMainNavigation'

const styles = theme => ({
  root: {
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531058983/maintenence_no_text_hxf1zt.svg)',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  },
  textBox: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '50%',
    height: '35%',
    padding: '15px'
  },
  '@global': {
    'h1, h2, h3, h4, h5, h6': {
      margin: 0
    }
  }
})

let Maintenance = ({ classes }) =>
  <div className={ classes.root }>
    <div className={ classes.textBox }>
      <h1>Temporary Maintenance in Progress!</h1>
      <h3>Carl has been hard at work on some cool new stuff – it should be done shortly!</h3>
      <br />
      <h3>Check back soon.</h3>
      <br />
      <h4>Questions in the mean time? E-mail <b>support@kiwicompute.com</b></h4>
    </div>
  </div>


export default withoutMainNavigation(withStyles(styles, { withTheme: true })(Maintenance))
