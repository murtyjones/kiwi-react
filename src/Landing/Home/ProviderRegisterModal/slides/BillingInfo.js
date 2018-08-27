import React, { Component } from 'react'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'

import SlideInOut from '../../../../common/animations/SlideInOut'
import KiwiTextField from '../../../../common/form/KiwiTextField'
import KiwiSelectField from '../../../../common/form/Select/KiwiSelectField'
import CardField from '../../../../common/form/payment/CardField'
import { billingInfoSlide } from '../slides'
import states from '../../../../utils/statesArray'
import { required, cardValid } from '../../../../utils/validationUtils'
import { successGreen } from '../../../../colors'
import { COUPONS, COUPON_LANGUAGE } from '../../../../constants'

const styles = {
  row: {

  },
  city: {
    display: 'inline-block',
    width: 'calc(50% - 5px)',
    margin: '0 5px 0 0',
    verticalAlign: 'top'
  },
  state: {
    display: 'inline-block',
    width: 'calc(50% - 5px)',
    margin: '0 0 0 5px',
    verticalAlign: 'top',
    position: 'relative',
    top: -4
  },
  discountCodeToBeApplied: {
    color: successGreen
  }
}

class ProvideesSignupSuccess extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
    classes: T.object.isRequired,
  }

  getDiscountCodeLanguage = () => {
    const { formValues: { discountCode } } = this.props
    return COUPON_LANGUAGE[discountCode]
  }

  render() {
    const { classes } = this.props

    return (
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          <Field
            name={ billingInfoSlide.names[0] }
            component={ KiwiTextField }
            label='Name on Card'
            validate={ [ required ] }
            addlInputLabelProps={ { shrink: true } }
          />
          <Field
            name={ billingInfoSlide.names[1] }
            component={ KiwiTextField }
            label='Address'
            validate={ [ required ] }
            addlInputLabelProps={ { shrink: true } }
          />
          <Field
            name={ billingInfoSlide.names[2] }
            component={ KiwiTextField }
            label='(Optional) Address Line 2'
            addlInputLabelProps={ { shrink: true } }
          />
          <div className={ classes.row }>
            <Field
              name={ billingInfoSlide.names[3] }
              component={ KiwiTextField }
              className={ classes.city }
              label='City'
              validate={ [ required ] }
              addlInputLabelProps={ { shrink: true } }
            />
            <Field
              name={ billingInfoSlide.names[4] }
              component={ KiwiSelectField }
              validate={ [ required ] }
              className={ classes.state }
              label='State'
              options={ states }
            />
            <Field
              name={ billingInfoSlide.names[5] }
              component={ CardField }
              validate={ [ required, cardValid ] }
            />
            <Field
              name={ billingInfoSlide.names[6] }
              component={ KiwiTextField }
              label='(Optional) Discount Code'
              normalize={ normalizeDiscountCode }
              addlInputLabelProps={ { shrink: true } }
              successText={ this.getDiscountCodeLanguage() }
              validate={ value =>
                !value || Object.values(COUPONS).includes(value) ? undefined : 'Invalid coupon!'
              }
            />
          </div>
        </div>
      </SlideInOut>
    )
  }
}

const normalizeDiscountCode = value => {
  if (!value) {
    return value
  }

  return value.toUpperCase()
}


ProvideesSignupSuccess = withStyles(styles, { withTheme: true })(ProvideesSignupSuccess)

export default ProvideesSignupSuccess