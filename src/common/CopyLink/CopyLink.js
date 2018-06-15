import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toggle, SelectField } from 'redux-form-material-ui'
import IconButton from '@material-ui/core/IconButton'
import ContentCopy from 'material-ui-icons/ContentCopy'
import CopyToClipboard from 'react-copy-to-clipboard'

import './overrides.css'

const styles = {
  contentCopy: {
    width: '20px',
    height: '20px'
  },
  contentCopyColor: '#0074D9',
  linkCopied: {
    top: '5px', position: 'relative'
  }
}

const CopyLink = ({ text, linkCopied, onCopy }) =>
  <div className='copyLoginLinkContainer'>
    Your student is all setup! They can dive in and start
    coding using this link:
    <div className='copyLoginLinkBox'>
      { text }
      <CopyToClipboard
        text={ text }
        onCopy={ onCopy }
      >
        <IconButton
          variant='fab'
          aria-label='add'
          className='copyLoginLinkButton'
        >
          <ContentCopy
            style={ styles.contentCopy }
            color={ styles.contentCopyColor }
          />
        </IconButton>
      </CopyToClipboard>
    </div>
    { linkCopied && <span style={ styles.linkCopied }>Copied!</span> }
  </div>


export default CopyLink


