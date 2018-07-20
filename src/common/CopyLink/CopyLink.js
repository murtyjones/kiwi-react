import React, { Component } from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import ContentCopy from 'material-ui-icons/ContentCopy'
import CopyToClipboard from 'react-copy-to-clipboard'

const contentCopyColor = '#0074D9'

const styles = theme => ({
  copyLoginLinkContainer: {
    textAlign: 'center',
    color: '#000000'
  },
  copyLoginLinkBox: {
    border: '1px solid #CCC',
    margin: '10px auto',
    padding: 10,
    width: 270,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: '12pt',
    backgroundColor: '#F1F1F1'
  },
  copyLoginLinkButton: {
    width: '30px !important',
    height: '30px !important',
    background: 'transparent !important'
  },
  contentCopy: {
    width: '20px',
    height: '20px'
  },

  linkCopied: {
    top: '5px',
    position: 'relative',
    color: contentCopyColor
  }
})

const CopyLink = ({ classes, text, linkCopied, onCopy, formValues }) =>
  <div className={ classes.copyLoginLinkContainer }>
    Your student is all setup! They can dive in and start
    coding at the link below:
    <div className={ classes.copyLoginLinkBox }>
      { text }
      <CopyToClipboard
        text={ text }
        onCopy={ onCopy }
      >
        <IconButton
          variant='fab'
          aria-label='add'
          className={ classes.copyLoginLinkButton }
        >
          <ContentCopy
            className={ classes.contentCopy }
            color={ contentCopyColor }
          />
        </IconButton>
      </CopyToClipboard>
    </div>
    <b>Username: </b>{ formValues.username }<br />
    <b>Password: </b>{ formValues.password }
    { linkCopied && <div className={ classes.linkCopied }>Copied!</div> }
  </div>

CopyLink.propTypes = {
  text: T.string,
  linkCopied: T.bool,
  onCopy: T.func,
  formValues: T.object,
  classes: T.object,
}

export default withStyles(styles, { withTheme: true })(CopyLink)


