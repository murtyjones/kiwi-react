import React, { PureComponent } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 950,
    minWidth: 768,
    margin: '0 auto',
    paddingTop: 20,
    minHeight: 100
  }
})

class DashboardHeader extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        Hello
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DashboardHeader)