import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import Button from '@material-ui/core/Button'

import Delete from '@material-ui/icons/Delete'
import { TextField } from 'redux-form-material-ui'


import { CODE_CONCEPTS, COMPARISON_TYPES } from '../../../constants'
import KiwiTextField from '../../../common/form/KiwiTextField'
import KiwiSelectField from '../../../common/form/Select/KiwiSelectField'

const inputCriteriaOptions = [
  { label: 'I/O', value: '', disabled: true }
  , { label: 'print', value: CODE_CONCEPTS.PRINT }
  , { label: 'multi-line quote block', value: CODE_CONCEPTS.MULTI_LINE_QUOTE }
  , { label: 'input', value: CODE_CONCEPTS.INPUT }
  , { label: 'variable', value: CODE_CONCEPTS.VARIABLE }
  , { label: 'Control Flow', value: '', disabled: true }
  , { label: 'any loop', value: CODE_CONCEPTS.LOOP }
  , { label: 'for loop', value: CODE_CONCEPTS.FOR_LOOP }
  , { label: 'while loop', value: CODE_CONCEPTS.WHILE_LOOP }
  , { label: 'Conditional', value: '', disabled: true }
  , { label: 'if', value: CODE_CONCEPTS.IF }
  , { label: 'elif', value: CODE_CONCEPTS.ELIF }
  , { label: 'else', value: CODE_CONCEPTS.ELSE }
  , { label: 'Custom', value: '', disabled: true }
  , { label: 'User Global Variable', value: CODE_CONCEPTS.USER_GLOBAL_VARIABLE }
]

const occuranceTypeOptions = [
  { label: 'Preset', value: '', disabled: true }
  , { label: 'Never', value: COMPARISON_TYPES.NEVER }
  , { label: 'At least once', value: COMPARISON_TYPES.AT_LEAST_ONCE }
  , { label: 'Exactly once', value: COMPARISON_TYPES.EXACTLY_ONCE }
  , { label: 'No more than once', value: COMPARISON_TYPES.ONCE_MAX }
  , { label: 'Custom', value: '', disabled: true }
  , { label: 'At least:', value: COMPARISON_TYPES.AT_LEAST }
  , { label: 'Exactly:', value: COMPARISON_TYPES.EXACTLY }
  , { label: 'No more than:', value: COMPARISON_TYPES.NO_MORE_THAN }
]

export const isCustomCompType = type =>
  type === COMPARISON_TYPES.AT_LEAST ||
  type === COMPARISON_TYPES.EXACTLY ||
  type === COMPARISON_TYPES.NO_MORE_THAN

export const isGlobalVariableType = concept =>
  concept === CODE_CONCEPTS.USER_GLOBAL_VARIABLE

const styles = {
  container: {
    width: '50%'
    , border: '1px solid #CCCCCC'
    , padding: '15px'
    , boxSizing: 'border-box'
    , alignItems: 'center'
    , display: 'flex'
    , flexDirection: 'column'
  },
  addButton: { marginBottom: '10px' },
  deleteButton: {
    position: 'absolute'
    , right: '10px'
    , top: '10px'
    , cursor: 'pointer'
  },
  criterion: {
    width: '95%'
    , position: 'relative' // needed for abs children
    , border: '1px solid #CCCCCC'
    , borderRadius: '3px'
    , padding: '25px 15px 15px 15px'
    , marginBottom: '15px'
  },
  row1: {},
  row2: {},
  codingConceptContainer: {
    width: '40%'
    , display: 'inline-block'
    , marginRight: '10px'
  },
  occuranceTypeContainer: {
    width: '35%'
    , display: 'inline-block'
    , marginRight: '10px'
    , verticalAlign: 'top'
  },
  variable: {
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
  }
}


const DeleteButton = ({ onClick }) =>
  <div onClick={ onClick } style={ styles.deleteButton }>
    <Delete
      style={ { fill: '#CCCCCC' } }
    />
  </div>


const CodingConceptField = ({ eachSlideRef }) =>
  <Field
    name={ `${eachSlideRef}.codingConcept` }
    hintText='Select One'
    label='Coding Concept'
    component={ KiwiSelectField }
    style={ { width: '100%' } }
    containerStyle={ styles.codingConceptContainer }
    options={ inputCriteriaOptions }
  />

const FailureHint = ({ eachSlideRef }) =>
  <Field
    name={ `${eachSlideRef}.failureHint` }
    label='Failure Hint'
    component={ KiwiTextField }
  />


const Criterion = ({ eachSlideRef, slideValues, isCustomOccurance, onDeleteCrition }) =>
  <div style={ styles.criterion }>
    <div style={ styles.row1 }>
      <CodingConceptField eachSlideRef={ eachSlideRef } />
      <Field
        name={ `${eachSlideRef}.occuranceType` }
        hintText='Select One'
        label='Should Appear'
        component={ KiwiSelectField }
        style={ { width: '100%' } }
        containerStyle={ styles.occuranceTypeContainer }
        options={ occuranceTypeOptions }
      />
      { isCustomOccurance &&
        <Fragment>
          <Field
            name={ `${eachSlideRef}.numberOfTimes` }
            label='Number of Times'
            component={ KiwiTextField }
            type='number'
          />
        </Fragment>
      }
      <DeleteButton onClick={ onDeleteCrition } />
    </div>
    <div style={ styles.row2 }>
      <FailureHint eachSlideRef={ eachSlideRef } />
    </div>
  </div>


const UserDefinedVariable = ({ eachSlideRef, variableOptions, onDeleteCrition }) =>
  <div style={ styles.criterion }>
    <div style={ styles.row1 }>
      <CodingConceptField eachSlideRef={ eachSlideRef } />
      <Field
        name={ `${eachSlideRef}.variableId` }
        hintText='Select One'
        label='Variable'
        component={ KiwiSelectField }
        style={ { width: '100%' } }
        containerStyle={ styles.variable }
        options={ variableOptions }
      />
      <DeleteButton onClick={ onDeleteCrition } />
    </div>
    <div style={ styles.row2 }>
      <FailureHint eachSlideRef={ eachSlideRef } />
    </div>
  </div>


const InputSuccessCriteria = ({ fields, slideValues, variableOptions }) => {

  return (
    <div style={ styles.container }>
      <Button variant='outlined' style={ styles.addButton } onClick={ () => fields.push({}) }>
        Add Input Success Criterion
      </Button>
      <Fragment>
        { fields.map((eachSlideRef, i) => {
          const isGlobalVariable = isGlobalVariableType(slideValues.inputSuccessCriteria[i].codingConcept)
          const isCustomOccurance = isCustomCompType(slideValues.inputSuccessCriteria[i].occuranceType)
          const onDeleteCrition = () => fields.remove(i)

          return !isGlobalVariable ? (
            <Criterion
              key={ i }
              eachSlideRef={ eachSlideRef }
              onDeleteCrition={ onDeleteCrition }
              isCustomOccurance={ isCustomOccurance }
            />
          ) : (
            <UserDefinedVariable
              key={ i }
              eachSlideRef={ eachSlideRef }
              variableOptions={ variableOptions }
              onDeleteCrition={ onDeleteCrition }
        />
          )
        }) }
      </Fragment>
    </div>
  )
}


export default InputSuccessCriteria
