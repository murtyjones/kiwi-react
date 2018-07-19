import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import cns from 'classnames'

const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
    maxWidth: 950,
    minWidth: 768,
    margin: '0 auto',
    paddingTop: 20,
    minHeight: 100
  },
  section: {
    display: 'block',
    width: '100%',
    height: '130px',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: '50%',
    }
  },
  messageContainer: {
    minHeight: 80,
    height: '100%',
    padding: '0 20px',
    [theme.breakpoints.up('md')]: {
      padding: 0,
      verticalAlign: 'top',
    }
  },
  mainMessage: {
    margin: 0
  },
  subMessage: {
    margin: 0,
    fontStyle: 'italic'
  },
  hotLinks: {
    flexGrow: 1
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
        <div className={ cns(classes.section, classes.messageContainer) }>
          <h2 className={ classes.mainMessage }>{ mainMessage }</h2>
          <div className={ classes.subMessage }>{ subMessage }</div>
        </div>
        <div className={ classes.section }>
          <Grid className={ classes.hotLinks } justify='center' container spacing={24}>
            { hotLinks.map((HotLink, i) => <HotLink key={ i } /> ) }
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DashboardHeader)