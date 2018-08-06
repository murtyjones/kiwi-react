import React from 'react'
import { CardElement } from 'react-stripe-elements'
import has from 'lodash/has'
import InputLabel from '@material-ui/core/InputLabel'

import './overrides.css'
import FormHelperText from '@material-ui/core/FormHelperText'
import cns from 'classnames'

const CardSection = props =>
  <CardElement
    className='CardField-input'
    style={ {
      base: {
        color: '#000'
        , fontSize: '16px'
        , lineHeight: '44px'
        , height: '44px',
        '::placeholder': {
          color: '#AAA',
        },
      },
      invalid: {
        color: '#CC5040',
        ':focus': {
          color: '#000',
        },
      },
    } }
    onChange={ has(props, 'input.onChange') ?
      props.input.onChange : null
    }
    onFocus={ props.input.onFocus }
    onBlur={ props.input.onBlur }
  />

const CardField = props => {
  const { meta: { error, touched } } = props
  const errorText = touched && error ? error : ''
  const hasError = !!errorText
  const classes = { error: hasError }

  return (
    <div className='KiwiField CardField-container' style={ props.containerStyle } >
      <InputLabel
        classes={{
          root: 'KiwiField-Label'
        }}
      >
        Credit Card
      </InputLabel>
      <CardSection
        { ...props }
      />
      { hasError &&
        <FormHelperText
          classes={{
            root: cns('KiwiSelectField-Helper', classes),
            error: cns('KiwiSelectField-Helper', classes)
          }}
          error={ true }
        >
          { error }
        </FormHelperText>
      }
    </div>
  )
}

export default CardField
