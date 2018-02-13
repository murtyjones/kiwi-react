import React, { Component } from 'react'
import CodeEditor from '../CodeEditor/CodeEditor'
import { openSideNav, closeSideNav, openTopBar, closeTopBar } from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../common/flex.css'

const styles = {
  prompt: {
    border: '1px solid #ccc',
    height: '100px',
    width: '100%'
  },
  textArea: {
    border: '1px solid #ccc',
    height: '500px',
    width: '100%'
  },
  codeEditorContainer: {
    height: '100%'
    , width: '100%'
    , overflow: 'auto'
  }
}

class StandaloneEditor extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillReceiveProps() {
    this.props.closeSideNav()
    this.props.closeTopBar()
  }

  componentWillUnmount() {
    this.props.openSideNav()
    this.props.openTopBar()
  }

  render() {
    return (
      <div className='flex flexFlowColumn' style={ styles.codeEditorContainer }>
        <CodeEditor
          key='lessonFullSizeEditor'
          className='lessonFullSizeEditor flexOneOneAuto'
        />
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    openSideNav: () => dispatch(openSideNav())
    , closeSideNav: () => dispatch(closeSideNav())
    , openTopBar: () => dispatch(openTopBar())
    , closeTopBar: () => dispatch(closeTopBar())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(StandaloneEditor))