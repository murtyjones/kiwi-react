import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import { List, ListItem, Divider, RaisedButton, FlatButton, MenuItem, Tabs, Tab, Dialog } from 'material-ui'
import Delete from 'material-ui-icons/Delete'
import { TextField } from 'redux-form-material-ui'


import { CODE_CONCEPTS, COMPARISON_TYPES } from '../../../constants'
import renderTextField from '../../../common/renderTextField'
import renderSelectField from '../../../common/renderSelectField'

const outputCriteriaOptions = [
  { header: 'Control Flow' }
  , { label: 'any loop', value: CODE_CONCEPTS.LOOP }
  , { label: 'for loop', value: CODE_CONCEPTS.FOR_LOOP }
  , { label: 'while loop', value: CODE_CONCEPTS.WHILE_LOOP }
  , { header: 'Conditional' }
  , { label: 'if', value: CODE_CONCEPTS.IF }
  , { label: 'elif', value: CODE_CONCEPTS.ELIF }
  , { label: 'else', value: CODE_CONCEPTS.ELSE }
]

const comparisonTypeOptions = [
  { header: 'Preset' }
  , { label: 'Never', value: COMPARISON_TYPES.NEVER }
  , { label: 'At least once', value: COMPARISON_TYPES.AT_LEAST_ONCE }
  , { label: 'Only once', value: COMPARISON_TYPES.ONLY_ONCE }
  , { label: 'Once or less', value: COMPARISON_TYPES.ONCE_MAX }
  , { header: 'Custom' }
  , { label: 'At least:', value: COMPARISON_TYPES.AT_LEAST }
  , { label: 'Only:', value: COMPARISON_TYPES.ONLY }
  , { label: 'No more than:', value: COMPARISON_TYPES.NO_MORE_THAN }
]

export const isCustomCompType = type =>
  type === COMPARISON_TYPES.AT_LEAST ||
  type === COMPARISON_TYPES.ONLY ||
  type === COMPARISON_TYPES.NO_MORE_THAN

const styles = {
  container: {
    width: '50%'
    , borderWidth: '1px 1px 1px 0'
    , borderStyle: 'solid'
    , borderColor: '#CCC'
    , display: 'inline-block'
    , padding: '15px'
    , boxSizing: 'border-box'
    , position: 'absolute'
    , top: 0
    , bottom: 0
    , right: 0
  },
  addButton: {
    marginBottom: '10px'
  },
  deleteButton: {
    position: 'absolute'
    , right: '15px'
    , top: '50%'
    , marginTop: '-15px'
    , cursor: 'pointer'
  },
  criterion: {
    width: '95%'
    , position: 'relative' // needed for abs children
    , border: '1px solid #CCCCCC'
    , borderRadius: '3px'
    , padding: '15px 15px 5px 15px'
    , marginBottom: '15px'
  },
  comparisonTypeContainer: {
    width: '25%'
    , display: 'inline-block'
    , marginRight: '10px'
    , verticalAlign: 'top'
  },
  textToFindContainer: {
    width: '50%'
    , display: 'inline-block'
    , marginRight: '10px'
    , verticalAlign: 'top'
  },
  numTimesContainer: {
    width: '30px'
    , display: 'inline-block'
    , marginRight: '10px'
    , verticalAlign: 'top'
  },
  labelHeader: {
    margin: '10px 24px'
    , color: '#CCCCCC'
    , textTransform: 'uppercase'
  },
  label: {
    display: 'block'
    , textTransform: 'uppercase'
    , color: '#CCCCCC'
    , fontSize: '8pt'
  },
}

const DeleteButton = ({ onClick }) =>
  <div onClick={ onClick } style={ styles.deleteButton }>
    <Delete
      style={ { fill: '#CCCCCC' } }
    />
  </div>

const MenuItemHeader = ({ headerText }) =>
  <Fragment>
    <h5 style={ styles.labelHeader }>{ headerText }</h5>
    <Divider />
  </Fragment>


const Criterion = ({ eachSlideRef, slideValues, isCustom, onDeleteCrition }) =>
  <div style={ styles.criterion }>
    <Field
      name={ `${eachSlideRef}.textToFind` }
      label='Text' // maintains spacing
      labelStyle={ styles.label }
      component={ renderTextField }
      style={ { height: '35px', width: '100%' } }
      inputStyle={ { marginTop: '7px' } }
      underlineStyle={ { bottom: '-5px' } }
      containerStyle={ styles.textToFindContainer }
    />
    <Field
      name={ `${eachSlideRef}.comparisonType` }
      hintText='Select One'
      label='Should Appear'
      labelStyle={ styles.label }
      component={ renderSelectField }
      style={ { width: '100%' } }
      containerStyle={ styles.comparisonTypeContainer }
    >
      { comparisonTypeOptions.map((eachOption, i) =>
        eachOption.header
          ? (
            <MenuItemHeader
              key={ i }
              headerText={ eachOption.header }
            />
          ) : (
            <MenuItem
              key={ i }
              primaryText={ eachOption.label }
              value={ eachOption.value }
            />
          )
      ) }
    </Field>
    { isCustom &&
      <Fragment>
        <Field
          name={ `${eachSlideRef}.numberOfTimes` }
          label='&nbsp;' // maintains spacing
          labelStyle={ styles.label }
          component={ renderTextField }
          parse={ v => Number(v) } // convert string to number
          style={ {
            height: '35px', width: '100%'
          } }
          inputStyle={ { marginTop: '7px', textAlign: 'center' } }
          underlineStyle={ { bottom: '-5px' } }
          containerStyle={ styles.numTimesContainer }
          type='number'
        />
        <span style={ { position: 'relative', top: '29px' } }>times</span>
      </Fragment>
    }
    <DeleteButton onClick={ onDeleteCrition } />
  </div>


const OutputSuccessCriteria = ({ fields, slideValues }) =>
  <div style={ styles.container }>
    <RaisedButton style={ styles.addButton } onClick={ () => fields.push({}) }>
      Add Output Success Criterion
    </RaisedButton>
    <Fragment>
      { fields.map((eachSlideRef, i) => {
        return (
          <Criterion
            key={ i }
            eachSlideRef={ eachSlideRef }
            onDeleteCrition={ () => fields.remove(i) }
            isCustom={ isCustomCompType(slideValues.outputSuccessCriteria[i].comparisonType) }
          />
        )
      }) }
    </Fragment>
  </div>

export default OutputSuccessCriteria