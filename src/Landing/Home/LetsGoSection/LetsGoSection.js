import React, { PureComponent, Fragment } from 'react'
import cns from 'classnames'

import './overrides.css'


export default class LetsGoSection extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='letsGoContainer'>
        <div className='letsGo'>
          <h2>Start your coding adventure today!</h2>
          <div
            className={ cns('letsGoBottomButton hvr-grow') }
            onClick={ this.props.openModal }
          >
            Sign Me Up!
          </div>
        </div>
      </div>
    )
  }
}
