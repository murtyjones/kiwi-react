import React, { PureComponent, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'
import cloneDeep from 'lodash/cloneDeep'

const styles = theme => ({
  dynamicSlogan: {
    position: 'fixed',
    WebkitTextAlign: 'left',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingBottom: 2,
    transition: 'height 100s',
    zIndex: 51,
    [theme.breakpoints.down('sm')]: {
      WebkitTextAlign: 'center',
      textAlign: 'center',
    },
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
  dynamicSubtext: {
    position: 'fixed',
    WebkitTextAlign: 'left',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingBottom: 2,
    transition: 'height 100s',
    zIndex: 51,
    [theme.breakpoints.down('sm')]: {
      WebkitTextAlign: 'center',
      textAlign: 'center',
    },
    '@media (max-width: 500px)': {
      '&.upTop': {
        display: 'none'
      }
    }
  },
  dynamicLearnmoreButton: {
    '@media (max-width: 768px)': {
      top: 15
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
    const { classes, text = '', subtext = '', fixPoint } = this.props
    const { mass } = this.state
    const minTopMass = 1.7
    const topMass = Math.max(mass, 0)
    const textMass = Math.max(Math.pow(topMass, 1.6) / 3, fixPoint)
    const topSlogan = Math.max(Math.pow(topMass, 3) + Math.pow(topMass, 2) + topMass - 50, minTopMass)
    const topButtonMass = Math.max(Math.pow(topMass, 3) + Math.pow(topMass, 2) + topMass - 50, minTopMass) + 10

    const sloganStyle = {
      fontSize: `calc(11px + ${textMass / 1.4}vw)`
      , lineHeight: `calc(15px + ${textMass}vw)`
      , top: `${topSlogan}vh`
      , width: '100vw'
      , padding: '0 50px'
      , boxSizing: 'border-box'
      , color: '#624F8F'
    }

    const subtextStyle = {
      fontSize: `calc(11px + ${textMass / 3.0}vw)`
      , lineHeight: `calc(15px + ${textMass}vw)`
      , top: `calc(${topSlogan}vh + 50px)`
      , width: '100vw'
      , padding: '0 50px'
      , boxSizing: 'border-box'
      , color: '#624F8F'
      , fontWeight: 'normal'
    }

    let signupButtonStyle = {
      fontFamily: 'Arvo',
      position: 'fixed',
      top: `calc(${topSlogan}vh + 15vh)`,
      marginLeft: -87,
      width: 190,
      backgroundColor: '#624F8F',
      color: '#FFFFFF',
      padding: '10px 30px',
      borderRadius: '25px',
      fontSize: '12pt',
      border: '2px solid #624F8F',
      fontWeight: 'bold',
      cursor: 'pointer',
      zIndex: 51,
      textAlign: 'center'
    }

    let learnMoreButtonStyle = cloneDeep(signupButtonStyle)

    signupButtonStyle.left = '15%'
    learnMoreButtonStyle.left = 'calc(15% + 210px)'
    learnMoreButtonStyle.background = 'transparent'
    learnMoreButtonStyle.color = '#624F8F'

    if (window.screen.width < 960) {
      sloganStyle.padding = '0 20px'
      subtextStyle.padding = '0 20px'
      sloganStyle.top = `${topSlogan - 13}vh`
      subtextStyle.top = `calc(${topSlogan - 15}vh + 50px)`
      signupButtonStyle.top = `calc(${topSlogan - 9}vh + 15vh)`
      signupButtonStyle.left = `50%`
      learnMoreButtonStyle.top = `calc(${topSlogan - 9}vh + 15vh + 60px)`
      learnMoreButtonStyle.left = `50%`
    }

    if (textMass <= fixPoint) {
      signupButtonStyle = {
        fontFamily: 'Arvo',
        background: 'transparent',
        position: 'fixed',
        top: '25px',
        right: 'calc(25px + 0px)', // right hand side must match transform one line below here
        transform: 'translateX(0px)',
        color: 'white',
        padding: '5px 15px',
        borderRadius: '15px',
        fontSize: '10pt',
        border: '2px solid #FFFFFF',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 51
      }

      learnMoreButtonStyle.visibility = 'hidden'
      subtextStyle.visibility = 'hidden'

      sloganStyle.color = '#FFFFFF'
    }



    return (
      <Fragment>

        <span
          className={ cns(classes.dynamicSlogan, { upTop: textMass <= fixPoint }) }
          style={ sloganStyle }
        >
          { textMass <= fixPoint ? '' : text }
        </span>

        <span
          className={ classes.dynamicSubtext }
          style={ subtextStyle }
        >
          { subtext }
        </span>


        <button
          id='sign-me-up-top'
          style={ signupButtonStyle }
          className={ cns(classes.dynamicCTAButton, 'hvr-grow') }
          onClick={ this.props.onSignUpClick }
        >
          Start for Free
        </button>


        <button
          id='learn-more'
          style={ learnMoreButtonStyle }
          className={ cns(classes.dynamicCTAButton, 'hvr-grow') }
          onClick={ this.props.onLearnMoreClick }
        >
          Learn More
        </button>

      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DynamicHeader)
