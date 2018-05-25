import React, { PureComponent, Fragment } from 'react'
import cns from 'classnames'

import './overrides.css'

const sections = [
  {
    headerText: 'Use your coding skills to survive on Tech Island',
    bodyText:`
      Kids love to learn and create. Through our interactive story, we give
      kids the context to make their own experiences with code while equipping
      them with the tech skills to be empowered in a digital world.
    `,
    imageUrl: '../../../../assets/images/tropical-island.svg',
    imageStyle: { top: '-30px' }
  },
  {
    headerText: 'Choose a trusted curriculum',
    bodyText:`
      Our kiwi team has taught, tested, and refined our curriculum with
      hundreds of kids in the classroom and the partnership of organizations
      like the National Science Foundation, Mozilla, Google, and the City of
      Austin. We’re bringing our curriculum online with the help and input of
      students and parents from across the country.
    `,
    imageUrl: 'https://res.cloudinary.com/kiwi-stage/image/upload/v1516730490/landing-mock_1_yldeln.png',
    style: { minHeight: '300px' }
  },
  {
    headerText: 'Give your digital kids the support they need',
    bodyText:`
      With a parent dashboard and progress updates, Kiwi gives you the tools
      to understand, support and help your child be successful over the course
      of their coding journey. No matter your own level of experience with
      computer science, we’ve got your back.
    `,
    imageUrl: '../../../../assets/images/toolboxy.svg',
    style: { minHeight: '400px' }
  },
  {
    headerText: 'Provide a safe and inclusive place for your kid to code with others',
    bodyText:`
      With all of the scary unknowns in the online world, we’re creating
      a safe and moderated middle schooler community that you can trust.
      Kiwi kids will build their skills together, collaborating, sharing
      knowledge and helping each other solve problems at every step of
      their coding journey.
    `,
    imageUrl: '../../../../assets/images/kids.svg'
  },
]

const StripedSection = props =>
  <div className='stripedSectionContainer' style={ props.style || {} }>
    <div className='stripedSection'>
      <div className='stripedSectionText'>
        <h1 className='stripedHeader'>
          { props.headerText }
        </h1>
        <p>
          { props.bodyText }
        </p>
      </div>
      <img
        className={ cns('stripedSectionImage', {
          right: props.right,
          left: !props.right
        }) }
        src={ props.imageUrl }
        style={ props.imageStyle || {} }
      />
    </div>
  </div>

export default class StripedSections extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='stripedContainer'>
        { sections.map((each, idx) =>
          <StripedSection
            style={ each.style }
            headerText={ each.headerText }
            bodyText={ each.bodyText }
            right={ idx % 2 === 0 }
            imageUrl={ each.imageUrl }
            imageStyle={ each.imageStyle } /*Offsets image cropping weirdness*/
          />
        ) }
      </div>
    )
  }
}
