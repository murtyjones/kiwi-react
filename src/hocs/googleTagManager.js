import React, { Component, Fragment } from 'react'
import gtmParts from 'react-google-tag-manager'
import config from 'config'

export class GoogleTagManager extends Component {
  componentDidMount() {
    const dataLayerName = this.props.dataLayerName || 'dataLayer'
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm'

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId)

      eval(gtmScriptNode.textContent)
    }
  }

  render() {
    const {
      gtmId = config.gtmId, scriptId, dataLayerName, additionalEvents, previewVariables, scheme
    } = this.props

    const gtm = gtmParts({
      id: gtmId,
      dataLayerName: dataLayerName || 'dataLayer',
      additionalEvents: additionalEvents || {},
      previewVariables: previewVariables || false,
      scheme: scheme || 'https:',
    })

    return (
      <div>
        <div>{ gtm.noScriptAsReact() }</div>
        <div id={ scriptId || 'react-google-tag-manager-gtm' }>
          { gtm.scriptAsReact() }
        </div>
      </div>
    )
  }
}


export default function googleTagManager(WrappedComponent, options = { }) {
  const HOC = class GoogleTagManager extends Component {
    componentDidMount() {
      const dataLayerName = this.props.dataLayerName || 'dataLayer'
      const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm'

      if (!window[dataLayerName]) {
        const gtmScriptNode = document.getElementById(scriptId)

        eval(gtmScriptNode.textContent)
      }
    }

    render() {
      const {
        gtmId = config.gtmId, scriptId, dataLayerName, additionalEvents, previewVariables, scheme
      } = options

      const gtm = gtmParts({
        id: gtmId,
        dataLayerName: dataLayerName || 'dataLayer',
        additionalEvents: additionalEvents || {},
        previewVariables: previewVariables || false,
        scheme: scheme || 'https:',
      })

      return (
        <Fragment>
          <div>
            <div>{ gtm.noScriptAsReact() }</div>
            <div id={ scriptId || 'react-google-tag-manager-gtm' }>
              { gtm.scriptAsReact() }
            </div>
          </div>
          <WrappedComponent { ...this.props } />
        </Fragment>
      )
    }
  }

  return HOC
}

// GoogleTagManager.propTypes = {
//   gtmId: React.PropTypes.string.isRequired,
//   dataLayerName: React.PropTypes.string,
//   additionalEvents: React.PropTypes.object,
//   previewVariables: React.PropTypes.string,
//   scriptId: React.PropTypes.string,
//   scheme: React.PropTypes.string,
// }
