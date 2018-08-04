import React, { PureComponent, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'

const styles = theme => ({
  dynamicSlogan: {
    position: 'fixed',
    WebkitTextAlign: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 2,
    transition: 'height 100s',
    zIndex: 51,
    '@media (max-width: 500px)': {
      '&.upTop': {
        display: 'none'
      }
    }
  },
  dynamicHeader: {
    '@media (max-width: 768px)': {
      height: 60,
      padding: 15
    }
  },
  dynamicCTAButton: {
    '@media (max-width: 768px)': {
      top: 15
    }
  },
})

const makeMass = () => 4 - window.scrollY / 200

class DynamicHeader extends PureComponent {
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
    const { classes, text = '', smallText = '', fixPoint } = this.props
    const { mass } = this.state
    const minTopMass = 1.7
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
      , color: '#624F8F'
    }

    let buttonStyle = {
      fontFamily: 'Arvo',
      position: 'fixed',
      top: `calc(${topSlogan}vh + 15vh)`,
      left: '50%',
      // width: '120px',
      marginLeft: '-85px',
      backgroundColor: '#624F8F',
      color: '#FFFFFF',
      padding: '10px 30px',
      borderRadius: '25px',
      fontSize: '13pt',
      border: '2px solid #624F8F',
      fontWeight: 'bold',
      cursor: 'pointer',
      zIndex: 51,
      textAlign: 'center'
    }

    if (textMass <= fixPoint) {
      buttonStyle = {
        fontFamily: 'Arvo',
        background: 'transparent',
        position: 'fixed',
        top: '25px',
        right: 'calc(35px + 50px)', // accounts for transform below
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

      sloganStyle.color = '#FFFFFF'
    }

    return (
      <Fragment>

        <span
          className={ cns(classes.dynamicSlogan, { 'upTop': textMass <= fixPoint }) }
          style={ sloganStyle }
        >
          { textMass <= fixPoint ? smallText : text }
        </span>


        <button
          className={ cns(classes.dynamicCTAButton, 'hvr-grow') }
          style={ buttonStyle }
          onClick={ this.props.onClick }
        >
          Sign Me Up!
        </button>

      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DynamicHeader)
