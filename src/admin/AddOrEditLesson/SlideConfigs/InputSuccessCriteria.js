import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import { List, ListItem, Divider, RaisedButton, FlatButton, MenuItem, Tabs, Tab, Dialog } from 'material-ui'
import Delete from 'material-ui-icons/Delete'
import { TextField } from 'redux-form-material-ui'


import { CODE_CONCEPTS, COMPARISON_TYPES } from '../../../constants'
import renderTextField from '../../../common/renderTextField'
import renderSelectField from '../../../common/renderSelectField'

const inputCriteriaOptions = [
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
  , { label: 'No more than once', value: COMPARISON_TYPES.ONLY_ONCE }
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
    , border: '1px solid #CCCCCC'
    , display: 'inline-block'
    , padding: '15px'
    , boxSizing: 'border-box'
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
    width: '90%'
    , position: 'relative' // needed for abs children
    , border: '1px solid #CCCCCC'
    , borderRadius: '3px'
    , padding: '15px 15px 5px 15px'
    , marginBottom: '15px'
  },
  codingConceptContainer: {
    width: '25%'
    , display: 'inline-block'
    , marginRight: '10px'
  },
  comparisonTypeContainer: {
    width: '35%'
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
      name={ `${eachSlideRef}.codingConcept` }
      hintText='Select One'
      label='Coding Concept'
      labelStyle={ styles.label }
      component={ renderSelectField }
      style={ { width: '100%' } }
      containerStyle={ styles.codingConceptContainer }
    >
      { inputCriteriaOptions.map((eachOption, i) =>
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
      <span style={ { position: 'relative', bottom: '25px' } }>times</span>
    </Fragment>
    }
    <DeleteButton onClick={ onDeleteCrition } />
  </div>

const InputSuccessCriteria = ({ fields, slideValues }) =>
  <div style={ styles.container }>
    <RaisedButton style={ styles.addButton } onClick={ () => fields.push({}) }>
      Add Input Success Criterion
    </RaisedButton>
    <Fragment>
      { fields.map((eachSlideRef, i) => {
        return (
          <Criterion
            key={ i }
            eachSlideRef={ eachSlideRef }
            onDeleteCrition={ () => fields.remove(i) }
            isCustom={ isCustomCompType(slideValues.inputSuccessCriteria[i].comparisonType) }
          />
        )
      }) }
    </Fragment>
  </div>

export default InputSuccessCriteria