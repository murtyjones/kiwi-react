import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-router-dom/Link'
// import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Checkbox as ReduxFormCheckbox } from 'redux-form-material-ui-next'
// import get from 'lodash/get'
import { blue } from '../../colors'

const styles = theme => ({
  root: {

  },
  checkbox: {
    '&$checked': {
      color: blue,
    },
  },
  checked: {}
})

class KiwiTextField extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  static propTypes = {
    classes: T.object.isRequired,
    className: T.object.isRequired
  }

  render() {
    const { className, classes, ...rest } = this.props

    return (
      <FormControlLabel
        className={ cns(classes.root, className) }
        control={
          <ReduxFormCheckbox
            { ...rest }
            classes={ {
              root: classes.checkbox,
              checked: classes.checked,
            } }
          />
        }
        label={
          <span>
            I have read and accept the <Link to='/terms' target='_blank'>Terms of Service</Link>
            &nbsp;and <Link to='/privacy' target='_blank'>Privacy Policy</Link>
          </span>
        }
      />
    )
  }
}

export default withStyles(styles, { withTheme: true })(KiwiTextField)