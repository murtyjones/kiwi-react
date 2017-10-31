import React, { Component } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValues } from 'redux-form'
import { List, ListItem, RaisedButton, MenuItem, Tabs, Tab } from 'material-ui'
import { find, isEmpty } from 'lodash'

import { slideTypes } from './slideTypes'
import renderKiwiSelectField from '../../common/renderKiwiSelectField'
import renderKiwiTextField from "../../common/renderKiwiTextField"

class Slides extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedSlideTypes: []
      , selectedSlideTitle: ''
      , canAddNewSlide: true
    }
  }

  static propTypes = {
    getAllCurrentSlideTypes: T.func
  }

  componentWillReceiveProps(nextProps) {
    const noSlidesSetYet = !this.props.slideTypes && isEmpty(this.state.selectedSlideTypes)
    const hasSlideToSet = !isEmpty(nextProps.slideTypes)
    if(noSlidesSetYet && hasSlideToSet) {
      this.setState({
        selectedSlideTypes: nextProps.slideTypes.map(e => e.type)
      })
    }
  }

  setSelectedSlideType = (slideIndex, value) => {
    const { selectedSlideTypes } = this.state
    this.setState({
      selectedSlideTypes: update(selectedSlideTypes, { $splice: [[slideIndex, 1, value]] }),
      canAddNewSlide: true
    })
  }

  deleteSelectedSlideType = (slideIndex) => {
    const { selectedSlideTypes } = this.state
    this.setState({
      selectedSlideTypes: update(selectedSlideTypes, { $splice: [[slideIndex, 1]] })
    })
  }

  renderSlideConfigure = (slideRef, value) => {
    const SlideConfigComponent = find(slideTypes, { value }).component
    return (
      <SlideConfigComponent
        slideRef={ slideRef }
      />
    )
  }

  renderSlideLabel = (i) => {
    return (
      <div>Slide #{i + 1}<i className="material-icons md-36">face</i></div>
    )
  }

  render() {
    const { fields } = this.props
    const { selectedSlideTypes, canAddNewSlide } = this.state
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
                { slideTypes.map((eachType, i) =>
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
              { selectedSlideTypes[i] && this.renderSlideConfigure(eachSlideRef, selectedSlideTypes[i]) }
            </Tab>
          ) }
        </Tabs>
      </List>
    )
  }
}

export default Slides