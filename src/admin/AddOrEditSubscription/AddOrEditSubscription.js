import React, { Component } from 'react'
import * as T from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { postSubscription, putSubscription, getSubscription } from '../../actions'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import SubscriptionForm from './SubscriptionForm'

class AddOrEditSubscription extends Component {
  constructor(props) {
    super(props)
    const isNewSubscription = props.match.path.includes('new')
    const subscriptionIsLoaded = !isEmpty(props.initialValues)
    this.state = {
      isNewSubscription
      , needsSubscription: !isNewSubscription && !subscriptionIsLoaded
    }
  }

  static propTypes =  {
    getSubscription: T.func.isRequired
    , postSubscription: T.func.isRequired
    , putSubscription: T.func.isRequired
    , initialValues: T.object.isRequired

  }

  UNSAFE_componentWillMount() {
    const { getSubscription, match: { params: { id } } } = this.props
    const { needsSubscription } = this.state
    if (needsSubscription) {
      getSubscription({ id })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.setState({ isNewSubscription: false, needsSubscription: false })
    }
  }

  handleSubmit = (params) => {
    const { postSubscription, putSubscription } = this.props
    const _id = params._id
    const id = params.id
    if (_id) {
      delete params._id
      params.id = _id
      return putSubscription(params)
    } else if (id) {
      return putSubscription(params)
    }
    return postSubscription(params).then(res => {
      this.props.history.push(`/admin/subscriptions/${res._id}`)
    })
  }

  render() {
    const { initialValues } = this.props
    const { needsSubscription, isNewSubscription } = this.state
    return (
      <div>
        { needsSubscription && isNewSubscription
          ? 'loading...'
          :
          <SubscriptionForm
            initialValues={ initialValues }
            onSubmit={ this.handleSubmit }
          />
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { subscriptions: { subscriptionsById } } = state
  const { match: { params: { id } } } = ownProps
  const subscription = subscriptionsById[id] || {}
  const initialValues = cloneDeep(subscription)
  return {
    initialValues
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putSubscription: params => dispatch(putSubscription(params))
    , postSubscription: params => dispatch(postSubscription(params))
    , getSubscription: params => dispatch(getSubscription(params))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditSubscription))
