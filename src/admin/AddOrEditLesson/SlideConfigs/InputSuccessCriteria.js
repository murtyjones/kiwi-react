import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'


import Delete from 'material-ui-icons/Delete'
import { TextField } from 'redux-form-material-ui'


import { CODE_CONCEPTS, COMPARISON_TYPES } from '../../../constants'
import renderTextField from '../../../common/renderTextField'
import renderSelectField from '../../../common/renderSelectField'

const inputCriteriaOptions = [
  { header: 'Functions' }
  , { label: 'print statement', value: CODE_CONCEPTS.PRINT }
  , { header: 'Control Flow' }
  , { label: 'any loop', value: CODE_CONCEPTS.LOOP }
  , { label: 'for loop', value: CODE_CONCEPTS.FOR_LOOP }
  , { label: 'while loop', value: CODE_CONCEPTS.WHILE_LOOP }
  , { header: 'Conditional' }
  , { label: 'if', value: CODE_CONCEPTS.IF }
  , { label: 'elif', value: CODE_CONCEPTS.ELIF }
  , { label: 'else', value: CODE_CONCEPTS.ELSE }
  , { header: 'Custom' }
  , { label: 'User Global Variable', value: CODE_CONCEPTS.USER_GLOBAL_VARIABLE }
]

const occuranceTypeOptions = [
  { header: 'Preset' }
  , { label: 'Never', value: COMPARISON_TYPES.NEVER }
  , { label: 'At least once', value: COMPARISON_TYPES.AT_LEAST_ONCE }
  , { label: 'Exactly once', value: COMPARISON_TYPES.EXACTLY_ONCE }
  , { label: 'No more than once', value: COMPARISON_TYPES.ONCE_MAX }
  , { header: 'Custom' }
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
    , padding: '15px'
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


const CodingConceptField = ({ eachSlideRef }) =>
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

const FailureHint = ({ eachSlideRef }) =>
  <Field
    name={ `${eachSlideRef}.failureHint` }
    label='Failure Hint'
    labelStyle={ styles.label }
    component={ renderTextField }
    inputStyle={ { marginTop: 0 } }
    style={ { width: '100%', height: '40px' } }
    containerStyle={ { display: 'block', height: '40px' } }
  />


const Criterion = ({ eachSlideRef, slideValues, isCustomOccurance, onDeleteCrition }) =>
  <div style={ styles.criterion }>
    <div style={ styles.row1 }>
      <CodingConceptField eachSlideRef={ eachSlideRef } />
      <Field
        name={ `${eachSlideRef}.occuranceType` }
        hintText='Select One'
        label='Should Appear'
        labelStyle={ styles.label }
        component={ renderSelectField }
        style={ { width: '100%' } }
        containerStyle={ styles.occuranceTypeContainer }
      >
        { occuranceTypeOptions.map((eachOption, i) =>
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
      { isCustomOccurance &&
        <Fragment>
          <Field
            name={ `${eachSlideRef}.numberOfTimes` }
            label='&nbsp;' // maintains spacing
            labelStyle={ styles.label }
            component={ renderTextField }
            parse={ v => Number(v) } // convert string to number
            type='number'
            style={ { height: '35px', width: '100%' } }
            inputStyle={ { marginTop: '7px', textAlign: 'center' } }
            underlineStyle={ { bottom: '-5px' } }
            containerStyle={ styles.numTimesContainer }
          />
          <span style={ { position: 'relative', bottom: '25px' } }>times</span>
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
        labelStyle={ styles.label }
        component={ renderSelectField }
        style={ { width: '100%' } }
        containerStyle={ styles.variable }
      >
        { variableOptions.map((eachOption, i) =>
          <MenuItem
            key={ i }
            primaryText={ eachOption.name }
            value={ eachOption._id }
          />
        ) }
      </Field>
      <DeleteButton onClick={ onDeleteCrition } />
    </div>
    <div style={ styles.row2 }>
      <FailureHint eachSlideRef={ eachSlideRef } />
    </div>
  </div>


const InputSuccessCriteria = ({ fields, slideValues, variableOptions }) => {

  return (
    <div style={ styles.container }>
      <RaisedButton style={ styles.addButton } onClick={ () => fields.push({}) }>
        Add Input Success Criterion
      </RaisedButton>
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