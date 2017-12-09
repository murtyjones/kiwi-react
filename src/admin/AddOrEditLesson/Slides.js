import React, { Component } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import { List, ListItem, RaisedButton, FlatButton, MenuItem, Tabs, Tab, Dialog } from 'material-ui'
import Clear  from 'material-ui-icons/Clear'
import { find, isEmpty } from 'lodash'

import { slideTypes as allSlideTypes } from './slideTypes'
import renderSelectField from '../../common/renderSelectField'
import renderTextField from "../../common/renderTextField"

const deleteStyle = {
  color: 'white'
  , height: '19px'
  , width: '19px'
  , position: 'absolute'
  , right: '0px'
}

class Slides extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localSlideTypes: []
      , selectedSlideTitle: ''
      , canAddNewSlide: true
      , deleteDialogOpen: false
      , activeSlideIndex: 0
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
      localSlideTypes: update(localSlideTypes, {$splice: [[slideIndex, 1, value]] })
      , canAddNewSlide: true
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

  deleteSlide = (i) => {
    const { fields } = this.props
    this.deleteSelectedSlideType(i)
    fields.remove(i)
    this.setState({ deleteDialogOpen: false })
  }

  renderSlideLabel = (i) => {
    const { activeSlideIndex } = this.state
    return (
      <div>
        Slide #{i + 1}
        { activeSlideIndex === i &&
          <Clear
            style={ deleteStyle }
            onClick={ () => { this.setState({ deleteDialogOpen: true }) } }
          />
        }
      </div>
    )
  }

  renderDeleteDialogActions = (i) => {
    const { activeSlideIndex } = this.state
    return [
      <FlatButton onClick={ () => { this.deleteSlide(activeSlideIndex) } }>
        Delete slide #{activeSlideIndex + 1}
      </FlatButton>,
      <FlatButton onClick={ () => { this.setState({ deleteDialogOpen: false }) } }>
        Cancel
      </FlatButton>
    ]
  }



  render() {
    const { fields } = this.props
    const { localSlideTypes, canAddNewSlide, deleteDialogOpen } = this.state

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
            <Tab key={ i } label={ this.renderSlideLabel(i) } onActive={ () => { this.setState({ activeSlideIndex: i }) } }>
              <Dialog
                key={ i }
                open={ deleteDialogOpen }
                actions={ this.renderDeleteDialogActions(i) }
              >
                Are you sure you want to delete slide #{i + 1}?
              </Dialog>
              <h4>Slide #{i + 1}</h4>
              <Field
                name={ `${eachSlideRef}.type` }
                label='Type'
                component={ renderSelectField }
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
                component={ renderTextField }
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