import React from 'react'
import withoutMainNavigation from '../hocs/withoutMainNavigation'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1531083800/Untitled_mkpqms.svg)',
    backgroundSize: '69%',
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat'
  }
})

const MobileRedirect = ({ classes }) =>
  <div className={ classes.root }>
    <div className={ classes.image } />
  </div>


export default withoutMainNavigation(withStyles(styles, { withTheme: true })(MobileRedirect))
