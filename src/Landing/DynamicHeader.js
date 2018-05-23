import React, { PureComponent } from 'react'
import cns from 'classnames'

export default class DynamicHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBackground: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({ showBackground: true })
    }
    if (window.scrollY < 100) {
      this.setState({ showBackground: false })
    }
  }

  render() {
    const { showBackground } = this.state

    return (
      <div
        className={ cns('dynamicHeader', { 'dynamicHeaderBackground': showBackground }) }
      >
        <img
          key='homeLogo'
          className='homeLogo'
          src='../../assets/images/landing-logo.svg'
        />
      </div>
    )
  }
}