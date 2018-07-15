import React from 'react'
import cns from 'classnames'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    padding: 0,
    boxSizing: 'border-box',
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
    , padding: '15px'
    , backgroundColor: '#FFF'
  },
  bubbleContent: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '0 10px',
    '& p, strong, b, i, u, span': {
      margin: 0
    }
  },
  isCodeExample: {
    fontFamily: 'monospace'
    , fontSize: '16pt'
  },
  cornerImage: {
    width: 100
  }
})

const Label = ({ className, label })  =>
  <div id='speechBubbleLabel'>
    <span className={ className }>
    { label }
    </span>
  </div>

const SpeechBubble = ({ classes, className, label, htmlContent, isCodeExample, cornerImageUrl }) => {
  return (
    <Paper className={ cns(classes.root, { [className]: className }) }>
      { label &&
        <Label
          label={ label }
          className={ classes.label }
        />
      }
      <div
        id='speechBubble'
        className={ cns(classes.bubble, { [classes.isCodeExample]: isCodeExample }) }
      >
        { cornerImageUrl &&
          <img
            className={ classes.cornerImage }
            src={ cornerImageUrl }
          />
        }
        <div className={ classes.bubbleContent } dangerouslySetInnerHTML={ { __html: htmlContent } } />
      </div>
    </Paper>
  )
}

export default withStyles(styles, { withTheme: true })(SpeechBubble)
