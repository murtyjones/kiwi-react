import React, { Component } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  section: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%'
  },
  'section-1': {
    backgroundImage: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1532556273/Map/map-section-1.svg)'
  },
})

class MapSection extends Component {
  constructor() {
    super()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        <div className={ cns(classes.section, classes[`section-${1}`]) } />
      </div>
    )
  }
}

MapSection.propTypes = {
  classes: T.object,
  children: T.any,
  orderedCombinedLessonData: T.object,
  activeLessonId: T.string,
}

export default withStyles(styles)(MapSection)