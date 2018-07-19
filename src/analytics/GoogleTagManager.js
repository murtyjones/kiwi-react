import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import gtmParts from 'react-google-tag-manager'

const GoogleTagManager = ({gtmId, dataLayerName, events, previewVariables}) => {
  const gtm = gtmParts({id: gtmId, dataLayerName, events, previewVariables})

  const gtmNode = !window[dataLayerName]
    ? ReactDOM.createPortal(gtm.scriptAsReact(), document.head)
    : undefined

  return (
    <Fragment>
      {gtmNode}
      {gtm.noScriptAsReact()}
    </Fragment>
  )
}

GoogleTagManager.propTypes = {
  gtmId: PropTypes.string.isRequired,
  dataLayerName: PropTypes.string,
  events: PropTypes.shape(),
  previewVariables: PropTypes.string,
}

GoogleTagManager.defaultProps = {
  dataLayerName: "dataLayer",
  events: {},
  previewVariables: "",
}

export default GoogleTagManager