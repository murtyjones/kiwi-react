import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postVariable, putVariable, getVariable } from '../../actions'
import { has, isEmpty, isEqual, cloneDeep } from 'lodash'
import VariableForm from './VariableForm'

class AddOrEditVariable extends Component {
  constructor(props) {
    super(props)
    const isNewVariable = props.match.path.includes('new')
    const variableIsLoaded = !isEmpty(props.initialValues)
    this.state = {
      isNewVariable
      , needsVariable: !isNewVariable && !variableIsLoaded
    }
  }

  static propTypes =  {
    getVariable: T.func.isRequired
    , postVariable: T.func.isRequired
    , putVariable: T.func.isRequired
    , initialValues: T.object.isRequired

  }

  componentWillMount() {
    const { getVariable, match: { params: { id } } } = this.props
    const { needsVariable } = this.state
    if(needsVariable) {
      getVariable({ id })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.setState({ isNewVariable: false, needsVariable: false })
    }
  }

  handleSubmit = (params) => {
    const { postVariable, putVariable } = this.props
    const _id = params._id
    const id = params.id
    if(_id) {
      delete params._id
      params.id = _id
      return putVariable(params)
    } else if(id) {
      return putVariable(params)
    }
    return postVariable(params).then(res => {
      this.props.history.push(`/admin/variables/${res._id}`)
    })
  }

  render() {
    const { initialValues } = this.props
    const { needsVariable, isNewVariable } = this.state
    return (
      <div>
        { needsVariable && isNewVariable
          ? 'loading...'
          :
          <VariableForm
            initialValues={ initialValues }
            onSubmit={ this.handleSubmit }
          />
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { variables: { variablesById } } = state
  const { match: { params: { id } } } = ownProps
  const variable = variablesById[id] || {}
  const initialValues = cloneDeep(variable)

  return {
    initialValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putVariable: params => dispatch(putVariable(params))
    , postVariable: params => dispatch(postVariable(params))
    , getVariable: params => dispatch(getVariable(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditVariable))
