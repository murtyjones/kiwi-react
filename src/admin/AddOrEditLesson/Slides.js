import React, { Component } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import { List, ListItem, RaisedButton, FlatButton, MenuItem, Tabs, Tab, Dialog } from 'material-ui'
import Clear  from 'material-ui-icons/Clear'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
import ChevronRight from 'material-ui-icons/ChevronRight'
import { find, isEmpty } from 'lodash'

import { slideTypes as allSlideTypes } from './slideTypes'
import renderSelectField from '../../common/renderSelectField'
import renderTextField from "../../common/renderTextField"


const defaultSlideTypeValue = allSlideTypes[0].value

function immutablySwapItems(items, firstIndex, secondIndex) {
  // Constant reference - we can still modify the array itself
  const results= items.slice();
  const firstItem = items[firstIndex];
  results[firstIndex] = items[secondIndex];
  results[secondIndex] = firstItem;

  return results;
}

const styles = {
  deleteStyle: {
    color: 'white'
    , height: '20px'
    , width: '20px'
    , position: 'absolute'
    , right: '0px'
  },
  leftChevronStyle: {
    color: 'white'
    , height: '24px'
    , width: '24px'
    , position: 'absolute'
    , left: '20%'
    , marginLeft: '-12px'
  },
  rightChevronStyle: {
    color: 'white'
    , height: '24px'
    , width: '24px'
    , position: 'absolute'
    , right: '20%'
    , marginRight: '-12px'
  }
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

  addSlideAfterCurrent = () => {
    const { activeSlideIndex, localSlideTypes } = this.state
    const { fields } = this.props
    fields.insert(activeSlideIndex + 1, {})
    this.setState({ localSlideTypes: update(localSlideTypes, { $splice: [[activeSlideIndex + 1, 0, defaultSlideTypeValue]] }) })
    this.setState({ canAddNewSlide: false })
  }

  moveSlide = (to) => {
    const { fields } = this.props
    const { activeSlideIndex, localSlideTypes } = this.state
    const incremented = this.state.activeSlideIndex + 1
    const newLocalSlideTypes = immutablySwapItems(localSlideTypes, activeSlideIndex, this.state.activeSlideIndex + 1)
    fields.swap(activeSlideIndex, incremented)
    this.setState({
      activeSlideIndex: this.state.activeSlideIndex + 1
      , localSlideTypes: update(localSlideTypes, { $set: newLocalSlideTypes })
    }, function () {
      console.log(this.state.activeSlideIndex);
    })
  }

  renderSlideLabel = (i) => {
    const { activeSlideIndex } = this.state
    const { fields } = this.props
    const isActive = activeSlideIndex === i
    const fieldTitle = fields.get(i).title
    const title = fieldTitle ? `${fieldTitle} (#${i + 1})` : `Slide #${i + 1}`
    return (
      <div>
        { isActive &&
          <ChevronLeft
            style={ styles.leftChevronStyle }
            onClick={ () => { this.moveSlide(-1) } }
          />
        }
        { title }
        { isActive &&
          <ChevronRight
            style={ styles.rightChevronStyle }
            onClick={ () => { this.moveSlide(1) } }
          />
        }
        { isActive &&
          <Clear
            style={ styles.deleteStyle }
            onClick={ () => { this.setState({ deleteDialogOpen: true }) } }
          />
        }
      </div>
    )
  }

  renderDeleteDialogActions = () => {
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
    const { localSlideTypes, canAddNewSlide, deleteDialogOpen, activeSlideIndex } = this.state

    return (
      <List>
        <ListItem>
          <RaisedButton
            onClick={ () => fields.push({}) && this.setState({ canAddNewSlide: false }) }
            disabled={ !canAddNewSlide }
          >
            Add Slide to End
          </RaisedButton>
          <RaisedButton
            onClick={ this.addSlideAfterCurrent }
            disabled={ !canAddNewSlide }
          >
            Add Slide after Slide #{activeSlideIndex + 1}
          </RaisedButton>
        </ListItem>
        <Tabs initialSelectedIndex={ activeSlideIndex } >
          { fields.map((eachSlideRef, i) =>
            <Tab key={ i } label={ this.renderSlideLabel(i) } onActive={ () => { this.setState({ activeSlideIndex: i }) } }>
              <Dialog
                key={ i }
                open={ deleteDialogOpen }
                actions={ this.renderDeleteDialogActions() }
              >
                Are you sure you want to delete slide #{activeSlideIndex + 1}?
              </Dialog>
              <h4>Slide #{i + 1}</h4>
              <Field
                name={ `${eachSlideRef}.type` }
                hintText='Slide Type'
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
                hintText='Title'
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