import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import Button from '@material-ui/core/Button'

import Delete from '@material-ui/icons/Delete'


import { COMPARISON_TYPES } from '../../../constants'
import KiwiTextField from '../../../common/form/KiwiTextField'
import KiwiSelectField from '../../../common/form/Select/KiwiSelectField'

const occuranceTypeOptions = [
  { label: 'Preset', value: '', disabled: true }
  , { label: 'Never', value: COMPARISON_TYPES.NEVER }
  , { label: 'At least once', value: COMPARISON_TYPES.AT_LEAST_ONCE }
  , { label: 'Exactly once', value: COMPARISON_TYPES.EXACTLY_ONCE }
  , { label: 'Once or less', value: COMPARISON_TYPES.ONCE_MAX }
  , { label: 'Custom', value: '', disabled: true }
  , { label: 'At least:', value: COMPARISON_TYPES.AT_LEAST }
  , { label: 'Exactly:', value: COMPARISON_TYPES.EXACTLY }
  , { label: 'No more than:', value: COMPARISON_TYPES.NO_MORE_THAN }
]

export const isCustomCompType = type =>
  type === COMPARISON_TYPES.AT_LEAST ||
  type === COMPARISON_TYPES.EXACTLY ||
  type === COMPARISON_TYPES.NO_MORE_THAN

const styles = {
  container: {
    width: '50%'
    , borderWidth: '1px 1px 1px 0'
    , borderStyle: 'solid'
    , borderColor: '#CCC'
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
  occuranceTypeContainer: {
    width: '25%'
    , display: 'inline-block'
    , marginRight: '10px'
    , verticalAlign: 'top'
  },
  textToFindContainer: {
    display: 'inline-block'
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


const Criterion = ({ eachSlideRef, slideValues, isCustom, onDeleteCrition }) =>
  <div style={ styles.criterion }>
    <div style={ styles.row1 }>
      <Field
        name={ `${eachSlideRef}.textToFind` }
        label='Text' // maintains spacing
        component={ KiwiTextField }
        inputStyle={ { marginTop: '7px' } }
        style={ styles.textToFindContainer }
      />
      <Field
        name={ `${eachSlideRef}.occuranceType` }
        hintText='Select One'
        label='Should Appear'
        component={ KiwiSelectField }
        options={ occuranceTypeOptions }
      />
      { isCustom &&
        <Fragment>
          <Field
            name={ `${eachSlideRef}.numberOfTimes` }
            label='Number of Times' // maintains spacing
            component={ KiwiTextField }
            parse={ v => Number(v) } // convert string to number
            type='number'
          />
        </Fragment>
      }
      <DeleteButton onClick={ onDeleteCrition } />
    </div>
    <div style={ styles.row2 }>
      <Field
        name={ `${eachSlideRef}.failureHint` }
        label='Failure Hint'
        labelStyle={ styles.label }
        component={ KiwiTextField }
        inputStyle={ { marginTop: 0 } }
      />
    </div>
  </div>


const OutputSuccessCriteria = ({ fields, slideValues }) =>
  <div style={ styles.container }>
    <Button variant='outlined' style={ styles.addButton } onClick={ () => fields.push({}) }>
      Add Output Success Criterion
    </Button>
    <Fragment>
      { fields.map((eachSlideRef, i) => {
        return (
          <Criterion
            key={ i }
            eachSlideRef={ eachSlideRef }
            onDeleteCrition={ () => fields.remove(i) }
            isCustom={ isCustomCompType(slideValues.outputSuccessCriteria[i].occuranceType) }
          />
        )
      }) }
    </Fragment>
  </div>

export default OutputSuccessCriteria
