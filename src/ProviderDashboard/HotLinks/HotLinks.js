import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Person from '@material-ui/icons/Person'
import CreditCard from '@material-ui/icons/CreditCard'
import Public from '@material-ui/icons/Public'
import Link from 'react-router-dom/Link'

const highlightColor = '#765C9F'

const styles = theme => ({
  root: {
    height: '100%',
    padding: '10px !important',
    textAlign: 'center',
    color: highlightColor,
    '&:hover $linkText': { fontWeight: 'bold' },
    '&:hover $icon': { color: 'white' },
    '&:hover $circle': { backgroundColor: highlightColor },
  },
  circle: {
    position: 'relative',
    display: 'block',
    height: '60px',
    width: '60px',
    borderRadius: '50%',
    margin: '0 auto',
    border: `2px solid ${highlightColor}`
  },
  icon: {
    position: 'absolute',
    height: 36,
    width: 36,
    marginLeft: -18,
    marginTop: -18,
    top: '50%',
    left: '50%'
  },
  link: {
    color: highlightColor,
    textDecoration: 'none'
  },
  linkText: {
    paddingTop: '10px',
    textAlign: 'center'
  }
})

export const AccountInfo = withStyles(styles, { withTheme: true })(
  ({ classes }) =>
    <Grid className={ classes.root } item xs={ 4 }>
      <Link to='/provider/account' className={ classes.link }>
        <div className={ classes.circle }>
          <Person className={ classes.icon } />
        </div>
        <div className={ classes.linkText }>
          Account<br />
          Info
        </div>
      </Link>
    </Grid>
)

export const PaymentInfo = withStyles(styles, { withTheme: true })(
  ({ classes }) =>
    <Grid className={ classes.root } item xs={ 4 }>
      <Link to='/provider/billing' className={ classes.link }>
        <div className={ classes.circle }>
          <CreditCard className={ classes.icon } />
        </div>
        <div className={ classes.linkText }>
          Payment<br />
          Info
        </div>
      </Link>
    </Grid>
)

export const ExploreTechIsland = withStyles(styles, { withTheme: true })(
  ({ classes }) =>
    <Grid className={ classes.root } item xs={ 4 }>
      <Link to='/lessons' target='_blank' className={ classes.link }>
        <div className={ classes.circle }>
          <Public className={ classes.icon } />
        </div>
        <div className={ classes.linkText }>
          Explore<br />
          Tech Island
        </div>
      </Link>
    </Grid>
)