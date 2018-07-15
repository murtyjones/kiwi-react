import React, { Component, Fragment } from 'react'
import update from 'immutability-helper'
import * as T from 'prop-types'
import { Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Clear  from '@material-ui/icons/Clear'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import KiwiSelectField from '../../common/form/Select/KiwiSelectField'
import KiwiTextField from '../../common/form/KiwiTextField'
import immutablySwapItems from '../../utils/immutabilityUtils'

import { slideTypes as allSlideTypes } from './slideTypes'

const defaultSlideTypeValue = allSlideTypes[0].value

const styles = {
  deleteStyle: {
    color: 'black'
    , height: '20px'
    , width: '20px'
    , position: 'absolute'
    , right: '0px'
  },
  leftChevronStyle: {
    color: 'black'
    , height: '24px'
    , width: '24px'
    , position: 'absolute'
    , left: '20%'
    , marginLeft: '-12px'
  },
  rightChevronStyle: {
    color: 'black'
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
    const { allSlideValues, ...rest } = this.props
      , { localSlideTypes } = this.state
      , value = localSlideTypes[i]
      , SlideConfigComponent = find(allSlideTypes, { value }).component

    return (
      <SlideConfigComponent
        slideRef={ slideRef }
        slideValues={ allSlideValues[i] }
        { ...rest }
      />
    )
  }


  deleteSlide = (i) => {
    this.deleteSelectedSlideType(i)
    this.props.fields.remove(i)
    this.setState({ deleteDialogOpen: false })
  }

  addSlideToEnd = () => {
    const { localSlideTypes } = this.state
    this.props.fields.push({ type: defaultSlideTypeValue })
    this.spliceSelectedSlideType(localSlideTypes.length, 0, defaultSlideTypeValue)
  }


  addSlideAfterCurrent = () => {
    const { activeSlideIndex } = this.state
    this.props.fields.insert(
      this.props.fields.length === 0 ? 0 : activeSlideIndex + 1,
      { type: defaultSlideTypeValue }
      )
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


  render() {
    const { fields } = this.props
    const { localSlideTypes, deleteDialogOpen, activeSlideIndex } = this.state
    return (
      <Fragment>
        <div>
          <Button variant='outlined' onClick={ this.addSlideToEnd }>
            Add Slide to End
          </Button>
          <Button variant='outlined' onClick={ this.addSlideAfterCurrent }>
            Add Slide after Slide #{activeSlideIndex + 1}
          </Button>
        </div>
        <Tabs
          scrollable={ true }
          value={ activeSlideIndex }
          onChange={ (e, v) =>
            activeSlideIndex !== v && this.setState({ activeSlideIndex: v })
          }
        >
          { fields.map((eachSlideRef, i) =>
            <Tab
              key={ i }
              value={ i }
              label={ this.renderSlideLabel(i) }
            />
          ) }
        </Tabs>
        { fields.map((eachSlideRef, i) =>
          localSlideTypes[i] && i === activeSlideIndex &&
            <Fragment key={ i }>
              <Dialog
                key={ i }
                open={ deleteDialogOpen }
              >
                <DialogTitle id='alert-dialog-title'>Please Confirm</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    Are you sure you want to delete slide #{activeSlideIndex + 1}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant='outlined'
                    onClick={ () => { this.setState({ deleteDialogOpen: false }) } }
                    color='primary'
                  >
                    Cancel
                  </Button>
                  <Button variant='outlined'
                    onClick={ () => { this.deleteSlide(activeSlideIndex) } }
                    color='primary'
                    autoFocus
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <h4>Slide #{i + 1}</h4>
              <Field
                name={ `${eachSlideRef}.type` }
                hintText='Slide Type'
                component={ KiwiSelectField }
                options={ allSlideTypes }
                onSelectCustom={ v => this.spliceSelectedSlideType(i, 1, v) }
              />
              <Field
                name={ `${eachSlideRef}.backgroundImageUrl` }
                component={ KiwiTextField }
                label='Slide Background Image URL'
              />
              { localSlideTypes[i] && i === activeSlideIndex &&
                this.renderSlideConfigure(eachSlideRef, i)
              }
            </Fragment>
        ) }
      </Fragment>
    )
  }
}

export default Slides
