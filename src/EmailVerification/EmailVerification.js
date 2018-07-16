import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
import Link from 'react-router-dom/Link'

import withoutMainNavigation from '../hocs/withoutMainNavigation'
import { checkProfileEmailVerification } from '../actions'

const styles = {
  container: {
    textAlign: 'center',
    verticalAlign: 'middle',
    height: '80vh',
    paddingTop: '45vh'
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
        <h3>Your email is verified! Thank you :)</h3>
        <Link to='/'>
          Take me back home.
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkProfileEmailVerification: params => dispatch(checkProfileEmailVerification(params))
  }
}


export default withoutMainNavigation(withRouter(connect(null, mapDispatchToProps)(EmailVerification)))