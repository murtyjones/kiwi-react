import React, { Component } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValues } from 'redux-form'
import { List, ListItem, RaisedButton, MenuItem } from 'material-ui'
import { find, isEmpty } from 'lodash'

import { slideTypes } from './slideTypes'
import KiwiSelectField from '../../common/KiwiSelectField'

class Slides extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedSlideTypes: []
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
      selectedSlideTypes: update(selectedSlideTypes, { $splice: [[slideIndex, 1, value]] })
    })
  }

  deleteSelectedSlideType = (slideIndex) => {
    const { selectedSlideTypes } = this.state
    this.setState({
      selectedSlideTypes: update(selectedSlideTypes, { $splice: [[slideIndex, 1]] })
    })
  }

  renderSlideConfigure = (slideIndex, value) => {
    const SlideConfigComponent = find(slideTypes, { value }).component
    return (
      <SlideConfigComponent
        fieldRef={ `slides.${slideIndex}` }
      />
    )
  }

  render() {
    const { fields } = this.props
    const { selectedSlideTypes } = this.state
    return (
      <List>
        <ListItem>
          <RaisedButton onClick={ () => fields.push({}) }>
            Add Slide
          </RaisedButton>
        </ListItem>
        { fields.map((eachSlide, i) =>
          <ListItem key={ i }>
            <RaisedButton onClick={ () => {
              this.deleteSelectedSlideType(i)
              fields.remove(i)
            } } >
              Delete slide
            </RaisedButton>
            <h4>Slide #{i + 1}</h4>
            <Field
              name={`${eachSlide}.type`}
              label="Slide Type"
              component={ KiwiSelectField }
              onSelectCustom={ (v) => this.setSelectedSlideType(i, v) }
              options={ slideTypes }
            >
              { slideTypes.map((eachType, i) => {
                return (
                  <MenuItem
                    key={ i }
                    primaryText={ eachType.label }
                    value={ eachType.value }
                  />
                )
              }) }
            </Field>
            { selectedSlideTypes[i] && this.renderSlideConfigure(i, selectedSlideTypes[i]) }
          </ListItem>
        ) }
      </List>
    )
  }
}

export default Slides