import React, { Component } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import { List, ListItem, RaisedButton, MenuItem, Tabs, Tab } from 'material-ui'
import { find, isEmpty } from 'lodash'

import { slideTypes as allSlideTypes } from './slideTypes'
import renderKiwiSelectField from '../../common/renderKiwiSelectField'
import renderKiwiTextField from "../../common/renderKiwiTextField"

class Slides extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localSlideTypes: []
      , selectedSlideTitle: ''
      , canAddNewSlide: true
    }
  }

  static propTypes = {
    getAllCurrentSlideTypes: T.func
    , selectedSlideTypes: T.array
    , fields: T.object
  }

  componentWillReceiveProps(nextProps) {
    const noSlidesSetYet = !this.props.selectedSlideTypes && isEmpty(this.state.localSlideTypes)
    const hasSlideToSet = !isEmpty(nextProps.selectedSlideTypes)
    if(noSlidesSetYet && hasSlideToSet) {
      this.setState({ localSlideTypes: nextProps.selectedSlideTypes.map(e => e.type) })
    }
  }

  setSelectedSlideType = (slideIndex, value) => {
    const { localSlideTypes } = this.state
    this.setState({
      localSlideTypes: update(localSlideTypes, { $splice: [[slideIndex, 1, value]] }),
      canAddNewSlide: true
    })
  }

  deleteSelectedSlideType = (slideIndex) => {
    const { localSlideTypes } = this.state
    this.setState({ localSlideTypes: update(localSlideTypes, { $splice: [[slideIndex, 1]] }) })
  }

  renderSlideConfigure = (slideRef, value) => {
    const SlideConfigComponent = find(allSlideTypes, { value }).component
    return (
      <SlideConfigComponent
        slideRef={ slideRef }
      />
    )
  }

  renderSlideLabel = (i) => {
    const { fields } = this.props
    return (
      <div>Slide #{i + 1}<i className="material-icons md-36" onClick={ () => fields.remove(i) }> (X)</i></div>
    )
  }

  render() {
    const { fields } = this.props
    const { localSlideTypes, canAddNewSlide } = this.state
    return (
      <List>
        <ListItem>
          <RaisedButton
            onClick={ () => fields.push({}) && this.setState({ canAddNewSlide: false }) }
            disabled={ !canAddNewSlide }
          >
            Add Slide
          </RaisedButton>
        </ListItem>
        <Tabs>
          { fields.map((eachSlideRef, i) =>
            <Tab key={ i } label={ this.renderSlideLabel(i) }>
              <RaisedButton onClick={ () => {
                this.deleteSelectedSlideType(i)
                fields.remove(i)
              } } >
                Delete slide #{i + 1}
              </RaisedButton>
              <h4>Slide #{i + 1}</h4>
              <Field
                name={ `${eachSlideRef}.type` }
                label='Type'
                component={ renderKiwiSelectField }
                onSelectCustom={ (v) => this.setSelectedSlideType(i, v) }
              >
                { allSlideTypes.map((eachType, i) =>
                  <MenuItem
                    key={ i }
                    primaryText={ eachType.label }
                    value={ eachType.value }
                  />
                ) }
              </Field>
              <Field
                name={ `${eachSlideRef}.title` }
                label='Title'
                component={ renderKiwiTextField }
              />
              { localSlideTypes[i] && this.renderSlideConfigure(eachSlideRef, localSlideTypes[i]) }
            </Tab>
          ) }
        </Tabs>
      </List>
    )
  }
}

export default Slides