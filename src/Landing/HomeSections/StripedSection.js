import React, { PureComponent, Fragment } from 'react'

export default class StripedSection extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <div className='stripedSection'>Hello</div>
        <div className='stripedSection'>Hiya</div>
        <div className='stripedSection'>Hey there</div>
      </Fragment>
    )
  }
}
