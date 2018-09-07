import React, { PureComponent } from 'react'
import * as T from 'prop-types'
import cns from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  signupButtonHeader: {
    padding: '5px 10px',
    borderRadius: '25px',
    position: 'absolute',
    top: '50%',
    right: 20,
    zIndex: 53,
    color: 'white',
    border: '2px solid white',
    background: 'none',
    height: 29,
    marginTop: -15,
    cursor: 'pointer'
  }
})

class DynamicHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBackground: false
    }
  }

  static propTypes = {
    classes: T.object,
    openModal: T.func,
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
    const { classes } = this.props
    const { showBackground } = this.state

    const logoUrl = showBackground
      ? 'https://res.cloudinary.com/kiwi-prod/image/upload/v1535129642/Logos/kiwi_logo_white_v2.svg'
      : 'https://res.cloudinary.com/kiwi-prod/image/upload/v1535129758/Logos/kiwi_logo_purple_v2.svg'

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
        { showBackground &&
          <button
            id='sign-me-up-header'
            className={ cns(classes.signupButtonHeader,'hvr-grow') }
            onClick={ this.props.openModal }
          >
            Start for Free
          </button>
        }
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DynamicHeader)