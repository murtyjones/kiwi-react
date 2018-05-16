import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { get } from 'lodash'
import { checkProfileEmailVerification } from '../actions'

const styles = {
  container: {
    textAlign: 'center',
    verticalAlign: 'middle',
    height: '80vh'
  },
  message: {
    position: 'relative',
    top: '50%'
  }
}

class EmailVerification extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    checkProfileEmailVerification: T.func.isRequired
  }

  componentDidMount() {
    const email = get(queryString.parse(this.props.location.search), 'email', '')
    if(email) this.props.checkProfileEmailVerification({ email })
  }

  render() {
    return (
      <div style={ styles.container }>
        <h3 style={ styles.message }>Your email is verified! Thank you :)</h3>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkProfileEmailVerification: params => dispatch(checkProfileEmailVerification(params))
  }
}


export default withRouter(connect(null, mapDispatchToProps)(EmailVerification))