import React, { Component } from 'react'
import cns from 'classnames'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import SlideInOut from '../../../../common/animations/SlideInOut'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  container: {
    height: '100%'
  },
  select: {
    height: '100%',
    border: '1px solid #CCC',
    borderRadius: '3px',
    cursor: 'pointer',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#F1F1F1'
    }
  },
  left: {
    background: 'url(https://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/KidCarl_xly3ot.svg) no-repeat',
    backgroundPosition: 'center 90%',
    backgroundSize: 'auto 80%'
  },
  right: {
    background: 'url(http://res.cloudinary.com/kiwi-prod/image/upload/v1529364339/PapaCarl_cehuft.svg) no-repeat',
    backgroundPosition: 'center 90%',
    backgroundSize: 'auto 80%'
  }
})

class ChoosePath extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, input, onSubmit } = this.props

    return (
      <SlideInOut show={ true }>
        <div className={ classes.root }>
          <Grid container
            spacing={ 16 }
            className={ cns('loginModalForm-slide', classes.container) }
          >
            <Grid item
              xs={ 12 }
              md={ 6 }
              onClick={ () => {
                input.onChange(true) // is a student
                onSubmit(true) // is a student
              } }
            >
              <Paper
                className={ cns(classes.select, classes.left) }
              >
                <h3>
                  Student
                </h3>
              </Paper>
            </Grid>
            <Grid item
              xs={ 12 }
              md={ 6 }
              onClick={ () => {
                input.onChange(false) // is not a student
                onSubmit(false) // is not a student
              } }
            >
              <Paper
                className={ cns(classes.select, classes.right) }
              >
                <h3>
                  Parent / Account Owner
                </h3>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </SlideInOut>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ChoosePath)
