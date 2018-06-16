import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  root: {
    flexGrow: 1,
  },
}

class ProgressBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, completionPercentage } = this.props
    return (
      <div className={ classes.root }>
        <LinearProgress
          classes={{
            root: 'providerRegisterForm-ProgressBar',
            bar1Determinate: 'providerRegisterForm-ProgressBarDeterminate'
          }}
          variant='determinate'
          value={ completionPercentage }
        />
      </div>
    )
  }
}

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProgressBar)
