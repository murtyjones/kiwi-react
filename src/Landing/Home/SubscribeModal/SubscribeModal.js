import React, { Component } from 'react'
import * as T from 'prop-types'

import SubscribeForm from './SubscribeForm'
import '../../../close.css'


export default class SubscribeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false
    }
  }

  static propTypes = {
    handleSubmit: T.func.isRequired
  }

  render() {
    const { submitted } = this.state

    return (
      <div className='subscribeModalFormContainer'>
        <h2 className='subscribeHeader'>
          { submitted
            ? `Thanks for signing up!`
            : `We're launching soon!`
          }
        </h2>
        <h4 className='subscribeHeader'>
          { submitted
            ? `We'll be in touch soon.`
            : `Sign up below for updates and exclusive early access.`
          }
        </h4>
        { !submitted &&
          <SubscribeForm
            onSubmit={ p => {
              this.props.handleSubmit(p)
              this.setState({ submitted: true })
            } }
          />
        }
      </div>
    )
  }
}
