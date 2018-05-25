import React, { PureComponent, Fragment } from 'react'

import './overrides.css'

export default class StripedSections extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='stripedContainer'>

        <div className='stripedSectionContainer'>
          <div className='stripedSection'>
            <div className='stripedSectionText'>
              <h1 className='stripedHeader one'>Use your coding skills to survive on Tech Island</h1>
              <p>
                Kids love to learn and create. Through our interactive story, we give
                kids the context to make their own experiences with code while equipping
                them with the tech skills to be empowered in a digital world
              </p>
            </div>
            <img
              className='stripedSectionImage'
              src='../../../../assets/images/tropical-island.svg'
            />
          </div>
        </div>

        <div className='stripedSectionContainer'>
          <div className='stripedSection'>Hiya</div>
        </div>

        <div className='stripedSectionContainer'>
          <div className='stripedSection'>Hey there</div>
        </div>

      </div>
    )
  }
}
