import React, { PureComponent, Fragment } from 'react'
import cns from 'classnames'

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
    const minTopMass = 2.5
    const topMass = Math.max(mass, 0)
    const textMass = Math.max(Math.pow(topMass, 1.6) / 3, fixPoint)
    const topSlogan = Math.max(Math.pow(topMass, 3) + Math.pow(topMass, 2) + topMass - 50, minTopMass)
    const topButtonMass = Math.max(Math.pow(topMass, 3) + Math.pow(topMass, 2) + topMass - 50, minTopMass) + 10

    const sloganStyle = {
      fontSize: `calc(12px + ${textMass / 1.4}vw)`
      , lineHeight: `calc(15px + ${textMass}vw)`
      , top: `${topSlogan}vh`
      , width: '100vw'
      , padding: '0 50px'
      , boxSizing: 'border-box'
    }

    let buttonStyle = {
      position: 'fixed',
      top: `${topButtonMass}vh`,
      left: '50%',
      width: '80px',
      marginLeft: '-70px',
      backgroundColor: 'white',
      color: '#654E93',
      padding: '10px 30px',
      borderRadius: '25px',
      fontSize: '13pt',
      border: '2px solid #FFFFFF',
      fontWeight: 'bold',
      cursor: 'pointer',
      zIndex: 51,
      textAlign: 'center'
    }

    if(textMass <= fixPoint) {
      buttonStyle = {
        position: 'fixed',
        top: '25px',
        right: 'calc(45px + 50px)', // accounts for transform below
        transform: 'translateX(50px)',
        color: 'white',
        padding: '5px 25px',
        borderRadius: '15px',
        fontSize: '10pt',
        border: '2px solid #FFFFFF',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 51
      }
    }

    return (
      <Fragment>

        <span
          className={ cns('dynamicSlogan', { 'upTop': textMass <= fixPoint }) }
          style={ sloganStyle }
        >
          { textMass <= fixPoint ? smallText : text }
        </span>


        <div
          className={ cns('dynamicCTAButton', 'hvr-grow') }
          style={ buttonStyle }
          onClick={ this.props.onClick }
        >
          Let's go!
        </div>

      </Fragment>
    )
  }
}
