import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
    maxWidth: 950,
    minWidth: 768,
    margin: '0 auto',
    paddingTop: 20
  },
  messageContainer: {
    display: 'block',
    width: '100%',
    minHeight: '80px',
    padding: '0 20px',
    [theme.breakpoints.up('md')]: {
      padding: 0,
      width: '50%',
      display: 'inline-block',
      verticalAlign: 'top',
    }
  },
  mainMessage: {
    margin: 0
  },
  subMessage: {
    margin: 0
  },
  hotLinks: {
    flexGrow: 1,
    textAlign: 'center',
    width: '100%',
    height: '130px',
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      height: '200px',
      width: '50%',
      position: 'absolute',
      top: 0,
      right: 0
    }
  }
})

class DashboardHeader extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    classes: T.object.isRequired,
    mainMessage: T.string.mainMessage,
    subMessage: T.string.subMessage,
    hotLinks: T.array.hotLinks,
  }

  render() {
    const { classes, mainMessage, subMessage, hotLinks } = this.props
    return (
      <div className={ classes.root }>
        <div className={ classes.messageContainer }>
          <h2 className={ classes.mainMessage }>{ mainMessage }</h2>
          <h3 className={ classes.subMessage }>{ subMessage }</h3>
        </div>
        <Grid className={ classes.hotLinks } justify='center' container spacing={24}>
          { hotLinks.map((HotLink, i) => <HotLink key={ i } /> ) }
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DashboardHeader)