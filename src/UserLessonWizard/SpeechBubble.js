import React from 'react'
import cns from 'classnames'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    padding: 0,
    boxSizing: 'border-box',
    height: '100%',
    boxShadow: 'none',
    background: 'none'
  },
  label: {
    backgroundColor: '#330000'
    , marginLeft: '15px'
    , fontWeight: 'bold'
    , fontSize: '13pt'
    , color: '#FFF'
    , borderRadius: '5px 5px 0 0'
    , padding: '4px 7px'
    , textTransform: 'uppercase'
    , position: 'relative'
    , top: '-1px'
  },
  bubble: {
    border: '3px solid #330000'
    , borderRadius: '10px'
    , padding: '0 15px'
    , backgroundColor: '#FFF'
  },
  isCodeExample: {
    fontFamily: 'monospace'
    , fontSize: '16pt'
  }
})

const Label = ({ className, label })  =>
  <div>
    <span className={ className }>
    { label }
    </span>
  </div>

const SpeechBubble = ({ classes, label, htmlContent, isCodeExample }) => {
  return (
    <Paper className={ classes.root }>
      <Label
        label={ label }
        className={ classes.label }
      />
      <div
        id='speechBubble'
        className={ cns(classes.bubble, { [classes.isCodeExample]: isCodeExample }) }
        dangerouslySetInnerHTML={ { __html: htmlContent } }
      />
    </Paper>
  )
}

export default withStyles(styles, { withTheme: true })(SpeechBubble)
