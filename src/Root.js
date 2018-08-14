import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import config from 'config'
import withRouter from 'react-router-dom/withRouter'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import cns from 'classnames'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'

import './utils/getNewToken'

import GoogleTagManager from './analytics/GoogleTagManager'
import Routes from './Routes/Routes'
import { closeModal, signout } from './actions'

Modal.setAppElement(document.getElementById('app'))


/**
 * Route Components/Containers
 */
import TopBar from './TopBar/TopBar'

const styles = () => ({
  root: {
    borderRadius: 0
    , margin: 0
    , position: "absolute"
    , top: '60px'
    , left: 0
    , right: 0
    , bottom: 0
    , fontFamily: "Roboto, sans-serif"
  },
  environmentReminder: {
    position: 'fixed'
    , top: 0
    , left: 0
    , zIndex: 1200
    , backgroundColor:
      config.environmentLabel === 'local'
        ? '#ff3f79'
        : config.environmentLabel === 'development'
        ? '#32a8ff'
        : '#d9af21' // stage
    , width: '100%'
    , height: '20px'
    , margin: 0
    , textTransform: 'uppercase'
    , fontFamily: 'Arial'
    , fontWeight: 'bold'
    , color: '#FFFFFF'
    , textAlign: 'center'
    , WebkitTextAlign: 'center'
    , opacity: 0.5,
    '&:hover': {
      opacity: 1.0
    }
  },
  '@global': {
    'button': {
      WebkitTouchCallout: 'none', /* iOS Safari */
      WebkitUserSelect: 'none', /* Safari */
      KhtmlUserSelect: 'none', /* Konqueror HTML */
      MozUserSelect: 'none', /* Firefox */
      MsUserSelect: 'none', /* Internet Explorer/Edge */
      userSelect: 'none' /* Non-prefixed version, currently supported by Chrome and Opera */
    }

  }
})

const EnvironmentReminder = ({ className }) =>
  <div className={ className }>
    { config.environmentLabel } environment
  </div>

class Root extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    topBar: T.object.isRequired
    , closeModal: T.func.isRequired
    , modal: T.object.isRequired
    , classes: T.object.isRequired
    , userId: T.string.isRequired
  }

  render() {
    const {
      classes, userId, modal, topBar
    } = this.props

    const topBarWidthString = `${topBar.topBarHeight}px`

    const additionalEvents = { userId }

    return (
      <Fragment>
        { process.env.NODE_ENV === 'production' &&
          <GoogleTagManager gtmId='GTM-TJPSGHC' additionalEvents={ additionalEvents }/>
        }
        <div>
          { process.env.NODE_ENV !== 'production' &&
            <EnvironmentReminder className={ classes.environmentReminder } />
          }
          <Helmet>
            <title>Kiwi Compute</title>
          </Helmet>
          <Modal
            isOpen={ modal.isOpen }
            onRequestClose={ this.props.closeModal }
            className={ cns('kiwi-modal', modal.className) }
            overlayClassName={ modal.overlayClassName ? modal.overlayClassName : 'ModalOverlay' }
          >
            { modal.hasCloseButton &&
              <div
                className='x-sm x-black'
                style={ { position: 'absolute', top: 20, right: 20 } }
                onClick={ this.props.closeModal }
              />
            }
            { modal.children }
          </Modal>
          <TopBar />
          <div className={ classes.root } style={ { top: topBarWidthString } }>
            <Routes />
          </div>
        </div>
      </Fragment>
    )
  }
}

export const RootComponent = Root

const mapStateToProps = (state) => {
  const {
    auth: { userId, subscription },
    topBar,
    modal
  } = state

  return {
    subscription
    , topBar
    , modal
    , userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
    , closeModal: params => dispatch(closeModal(params))
  }
}

Root = withStyles(styles)(Root)

Root = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))

export default Root
