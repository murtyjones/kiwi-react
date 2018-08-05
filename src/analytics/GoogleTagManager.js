import React from 'react'
import * as T from 'prop-types'
import gtmParts from 'react-google-tag-manager'

class GoogleTagManager extends React.Component {
  componentDidMount() {
    const dataLayerName = this.props.dataLayerName || 'dataLayer'
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm'

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId)

      eval(gtmScriptNode.textContent)
    }
  }

  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {},
      previewVariables: this.props.previewVariables || false,
      scheme: this.props.scheme || 'https:',
    })

    return (
      <div>
        <div>{ gtm.noScriptAsReact() }</div>
        <div id={ this.props.scriptId || 'react-google-tag-manager-gtm' }>
          { gtm.scriptAsReact() }
        </div>
      </div>
    )
  }
}

GoogleTagManager.propTypes = {
  gtmId: T.string.isRequired,
  dataLayerName: T.string,
  additionalEvents: T.object,
  previewVariables: T.string,
  scriptId: T.string,
  scheme: T.string,
}

export default GoogleTagManager