import React, { Component } from 'react'
import ContactForm from './ContactForm'

import '../../close.css'


export default class SubscribeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false
    }
  }

  render() {
    const { submitted } = this.state

    return (
      <div className='subscribeModalFormContainer'>
        <div
          className='x-sm x-black'
          style={ {
            position: 'absolute',
            top: -15,
            right: -15,
          } }
          onClick={ this.props.onClose }
        />
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
          <ContactForm
            onSubmit={ p => {
              this.props.handleMessageSubmit(p)
              this.setState({ submitted: true })
            } }
          />
        }
      </div>
    )
  }
}
