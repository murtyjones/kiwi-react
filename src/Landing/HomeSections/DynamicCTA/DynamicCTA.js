import React, { PureComponent, Fragment } from 'react'

import './overrides.css'

const makeMass = () => 4 - window.scrollY / 200

export default class DynamicHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mass: makeMass()
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({ mass: makeMass() })
  }

  render() {
    const { text = '', smallText = '', fixPoint } = this.props
    const { mass } = this.state
    const textMass = Math.max(mass, fixPoint)
    const topMass = Math.max(mass, 0)
    const topSlogan = topMass * 5 + 2.5
    const topButton = topMass * 5 + 12.5
    const sloganStyle = {
      fontSize: `calc( 3px + ${textMass}vw)`
      , lineHeight: `${textMass}vw`
      , top: `${topSlogan}vh`
      , width: '100vw'
    }

    let buttonStyle = {
      top: `${topButton}vh`,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      color: '#654E93',
      padding: '10px 30px',
      borderRadius: '25px',
      fontSize: '13pt'
    }

    if(textMass === fixPoint) {
      buttonStyle = {
        right: '15px',
        color: 'white',
        padding: '5px 25px',
        borderRadius: '15px',
        fontSize: '10pt'
      }
    }

    return (
      <Fragment>

        <span
          className='dynamicSlogan'
          style={ sloganStyle }
        >
          { textMass === fixPoint ? smallText : text }
        </span>


        <div
          className='dynamicCTAButton'
          style={ buttonStyle }
          onClick={ null }
        >
          Let's go!
        </div>

      </Fragment>
    )
  }
}