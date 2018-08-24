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

    const logoUrl = showBackground
      ? 'https://res.cloudinary.com/kiwi-prod/image/upload/v1535126323/Logos/kiwi_logo_white_v2.svg'
      : 'https://res.cloudinary.com/kiwi-prod/image/upload/v1535126290/Logos/kiwi_logo_purple_v2.svg'

    return (
      <div
        className={ cns('dynamicHeader', {
          'dynamicHeaderBackground': showBackground
        }) }
      >
        <img
          key='homeLogo'
          className='homeLogo'
          src={ logoUrl}
        />
      </div>
    )
  }
}
