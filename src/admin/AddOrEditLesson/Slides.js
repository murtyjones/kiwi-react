import React, { Component } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import { List, ListItem, RaisedButton, FlatButton, MenuItem, Tabs, Tab, Dialog } from 'material-ui'
import Clear  from 'material-ui-icons/Clear'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
import ChevronRight from 'material-ui-icons/ChevronRight'
import { find, isEmpty, clone } from 'lodash'

import renderSelectField from '../../common/renderSelectField'
import renderTextField from '../../common/renderTextField'
import immutablySwapItems from '../../utils/immutabilityUtils'

import { slideTypes as allSlideTypes } from './slideTypes'
const defaultSlideTypeValue = allSlideTypes[0].value

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
      , deleteDialogOpen: false
      , activeSlideIndex: 0
    }
  }

  static propTypes = {
    getAllCurrentSlideTypes: T.func
    , allSlideValues: T.array
    , fields: T.object
  }

  componentWillReceiveProps(nextProps) {
    const { allSlideValues } = this.props
    const { allSlideValues: nextAllSlideValues } = nextProps
    const { localSlideTypes } = this.state

    const noSlidesSetYet = !allSlideValues && isEmpty(localSlideTypes)
    const hasSlideToSet = !isEmpty(nextAllSlideValues)

    if(noSlidesSetYet && hasSlideToSet) {
      this.setState({ localSlideTypes: nextAllSlideValues.map(e => e.type) })
    }
  }


  swapSelectedSlideType = (newSlot) => {
    const { localSlideTypes, activeSlideIndex } = this.state
    const newLocalSlideTypes = immutablySwapItems(localSlideTypes, activeSlideIndex, newSlot)
    this.setState({
      localSlideTypes: update(localSlideTypes, { $set: newLocalSlideTypes })
    })
  }


  spliceSelectedSlideType = (slideIndex, spliceBy, value) => {
    const { localSlideTypes } = this.state
    this.setState({
      localSlideTypes: update(localSlideTypes, { $splice: [[slideIndex, spliceBy, value]] })
    })
  }


  deleteSelectedSlideType = (slideIndex) => {
    const { localSlideTypes } = this.state
    this.setState({
      localSlideTypes: update(localSlideTypes, { $splice: [[slideIndex, 1]] })
    })
  }


  renderSlideConfigure = (slideRef, i) => {
    const { allSlideValues } = this.props
      , { localSlideTypes } = this.state
      , value = localSlideTypes[i]
      , SlideConfigComponent = find(allSlideTypes, { value }).component

    return (
      <SlideConfigComponent
        slideRef={ slideRef }
        slideValues={ allSlideValues[i] }
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
    const { activeSlideIndex } = this.state
    const { fields } = this.props
    fields.insert(activeSlideIndex + 1, {})
    this.spliceSelectedSlideType(activeSlideIndex + 1, 0, defaultSlideTypeValue)
  }

  moveSlide = (to) => {
    const { fields } = this.props
    const { activeSlideIndex } = this.state
    const newSlot = activeSlideIndex + to
    this.swapSelectedSlideType(newSlot)
    fields.swap(activeSlideIndex, newSlot)
    this.setState({ activeSlideIndex: newSlot })
  }


  renderSlideLabel = (i) => {
    const { activeSlideIndex } = this.state
    const { fields } = this.props
    const isActive = activeSlideIndex === i
    const title = `#${i + 1}`
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
    const { localSlideTypes, deleteDialogOpen, activeSlideIndex } = this.state

    return (
      <List>
        <ListItem>
          <RaisedButton onClick={ () => fields.push({}) }>
            Add Slide to End
          </RaisedButton>
          <RaisedButton onClick={ this.addSlideAfterCurrent }>
            Add Slide after Slide #{activeSlideIndex + 1}
          </RaisedButton>
        </ListItem>
        <Tabs value={ activeSlideIndex }>
          { fields.map((eachSlideRef, i) =>
            <Tab
              key={ i }
              value={ i }
              label={ this.renderSlideLabel(i) }
              onActive={ () => activeSlideIndex !== i && this.setState({ activeSlideIndex: i }) }
            >
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
                onSelectCustom={ (v) => this.spliceSelectedSlideType(i, 1, v) }
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
              { localSlideTypes[i] && this.renderSlideConfigure(eachSlideRef, i) }
            </Tab>
          ) }
        </Tabs>
      </List>
    )
  }
}

export default Slides