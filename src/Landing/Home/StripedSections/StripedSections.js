import React, { PureComponent, Fragment } from 'react'
import * as T from 'prop-types'
import ReactPlayer from 'react-player'
import cns from 'classnames'

import withStyles from '@material-ui/core/styles/withStyles'

const sections = [
  {
    className: 'videoSection',
    headerText: 'Take a Tour of The Kiwi Platform',
    bodyHtml: (
      <div style={ {
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
      } }>
        <ReactPlayer
          width='100%'
          height='100%'
          style={ {
            position: 'absolute',
            top: 0,
            left: 0
          } }
          url='https://youtu.be/WKWCoybQThM'
        />
      </div>
    )
  },
  {
    headerText: 'Use your coding skills to survive on Tech Island',
    bodyText:`
      Kids love to learn and create. Through our interactive story, we give
      kids the context to make their own experiences with code while equipping
      them with the tech skills to be empowered in a digital world.
    `,
    imageUrl: '../../../../assets/images/tropical-island.svg',
    imageStyle: { top: '-30px', width: '320px' }
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
    imageUrl: 'https://res.cloudinary.com/kiwi-stage/image/upload/w_350,c_scale/v1516730490/landing-mock_1_yldeln.png',
    style: { minHeight: '300px' },
    imageStyle: { width: '350px' }
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
    imageUrl: '../../../../assets/images/kids.svg',
    imageStyle: { width: '400px' }
  },
]

const styles = theme => ({
  root: {
    color: '#666666',
    '& $stripedSectionContainer:nth-child(even)': {
      backgroundColor: '#FFFFFF',
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'left',
      }
    },
    '& $stripedSectionContainer:nth-child(odd)':  { backgroundColor: '#F1F1F1', textAlign: 'left' },
    '& $stripedSectionContainer:nth-child(even) $stripedSectionText': { paddingLeft: 40, boxSizing: 'border-box' },
    '& $stripedSectionContainer:nth-child(odd)  $stripedSectionText': { paddingRight: 40, boxSizing: 'border-box' },
    [theme.breakpoints.down('sm')]: {
      '& $stripedSectionContainer:nth-child(even) $stripedSectionText': { paddingLeft: 0 },
      '& $stripedSectionContainer:nth-child(odd) $stripedSectionText': { paddingRight: 0 }
    }
  },
  stripedSectionContainer: {
    padding: 30,
    boxSizing: 'border-box',
    minHeight: 250
  },
  videoSection: {
    textAlign: 'center !important'
  },
  stripedSection: {
    maxWidth: 980,
    margin: '0 auto',
    position: 'relative'
  },
  stripedSectionText: {
    display: 'inline-block',
    maxWidth: 600,
    '& p': {
      fontFamily: 'sans-serif',
      lineHeight: '28px',
      color: '#999999'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      maxWidth: '100%'
    }
  },
  stripedHeader: { fontSize: 24, display: 'inline-block' },
  stripedSectionImage: {
    display: 'inline-block',
    width: 300,
    maxWidth: '100%',
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
      width: 300,
      position: 'relative',
      left: '50% !important',
      marginLeft: -150
    }
  },
  left: { left: 0 },
  right: { right: 0 },
})

const StripedSection = ({ classes, ...rest }) => {
  console.log(rest.bodyHtml)
  return (
    <div className={ cns(classes.stripedSectionContainer, classes[rest.className]) } style={ rest.style || {} }>
      <div className={ classes.stripedSection }>

      { rest.bodyHtml
        ?
        <Fragment>
          <h1 className={ classes.stripedHeader }>
            { rest.headerText }
          </h1>
          { rest.bodyHtml }
        </Fragment>
        :
        <Fragment>
          <div className={ classes.stripedSectionText } style={ rest.textStyle || {} }>
            <h1 className={ classes.stripedHeader }>
              { rest.headerText }
            </h1>
            <p>
              { rest.bodyText }
            </p>
          </div>
          <img
            className={ cns(classes.stripedSectionImage, {
              [classes.right]: rest.right,
              [classes.left]: !rest.right
            }) }
            src={ rest.imageUrl }
            style={ rest.imageStyle || {} }
          />
        </Fragment>
      }

      </div>
    </div>
  )
}

class StripedSections extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    classes: T.object
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        { sections.map((props, idx) =>
          <StripedSection
            key={ idx }
            classes={ classes }
            right={ idx % 2 === 0 }
            { ...props }
          />
        ) }
      </div>
    )
  }
}


StripedSections = withStyles(styles, { withTheme: true })(StripedSections)

export default StripedSections