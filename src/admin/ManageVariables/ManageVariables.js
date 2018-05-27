import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import get from 'lodash/get'

import VariableWidget from '../ManageVariables/VariableWidget'
import KiwiLink from '../../common/KiwiLink'
import { getManyVariables, deleteVariable } from '../../actions/index'


class ManageVariables extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getManyVariables: T.func.isRequired
    , deleteVariable: T.func.isRequired
  }

  componentWillMount() {
    const { getManyVariables } = this.props
    getManyVariables()
  }

  render() {
    const { variablesById } = this.props

    return (
      <div>
        <KiwiLink to='/admin/variables/new'>
          New Variable
        </KiwiLink>
        <h4>You may NOT <u>delete</u> a variable or <u>change its name</u> once created.</h4>
        <h5>Variables</h5>
        { Object.values(variablesById).map((variable, i) =>
          <VariableWidget key={ i } item={ variable } />
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { variables: { variablesById } } = state

  return {
    variablesById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManyVariables: params => dispatch(getManyVariables(params))
    , deleteVariable: params => dispatch(deleteVariable(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageVariables))
