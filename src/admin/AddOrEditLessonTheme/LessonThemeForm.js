import React, { Component } from 'react'
import * as T from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, SubmissionError, initialize, change, formValueSelector } from 'redux-form'

import { RaisedButton, List, ListItem, MenuItem } from 'material-ui'

import renderTextField from '../../common/renderTextField'
import KiwiSliderField from '../../common/renderSliderField'
import { Toggle, SelectField } from 'redux-form-material-ui'

let formName = 'lessonTheme'

const renderAssets = ({ fields }) => (
  <List>
    <ListItem>
      <RaisedButton onClick={ () => fields.push({}) }>Add Asset</RaisedButton>
    </ListItem>
    { fields.map((assetRef, i) =>
      <ListItem key={ i }>
        <RaisedButton onClick={ () => fields.remove(i) }>Remove Asset</RaisedButton>
        <h3>Asset #{i + 1}</h3>
        <Field
          name={ `${assetRef}.name` }
          placeholder='Asset Name'
          component={ renderTextField }
        />
        <Field
          name={ `${assetRef}.url` }
          placeholder='Asset URL'
          component={ renderTextField }
        />
        <Field
          name={ `${assetRef}.quadrant` }
          hintText='Quadrant'
          component={ SelectField }
        >
          <MenuItem key='topLeft'     value='topLeft'     primaryText='Top left (Sky)' />
          <MenuItem key='topRight'    value='topRight'    primaryText='Top right (Sky)' />
          <MenuItem key='bottomLeft'  value='bottomLeft'  primaryText='Bottom left (Ground)' />
          <MenuItem key='bottomRight' value='bottomRight' primaryText='Bottom right (Ground)' />
        </Field>
        <h4>Where to place the asset in the quadrant</h4>
        <label>Position relative to...<br/></label>
        <Field
          name={ `${assetRef}.relativeToLeftOrRight` }
          component={ SelectField }
        >
          <MenuItem key='right' value='right' primaryText='Right edge of quadrant' />
          <MenuItem key='left'  value='left'  primaryText='Left edge of quadrant' />
        </Field>
        <Field
          name={ `${assetRef}.relativeToTopOrBottom` }
          component={ SelectField }
        >
          <MenuItem key='top'    value='top'    primaryText='Top edge of quadrant' />
          <MenuItem key='bottom' value='bottom' primaryText='Bottom edge of quadrant' />
        </Field>
        <Field
          name={ `${assetRef}.x` }
          label='Percentage from left/right'
          component={ KiwiSliderField }
          defaultValue={ 0 }
          min={ -10 }
          step={ 1 }
          max={ 100 }
        />
        <Field
          name={ `${assetRef}.y` }
          label='Percentage from top/bottom'
          component={ KiwiSliderField }
          defaultValue={ 0 }
          min={ -10 }
          step={ 1 }
          max={ 100 }
        />
        <h4>How wide or tall the asset should be compared to the quadrant</h4>
        <label>Do you want to specify the assets width or its height?<br /></label>
        <Field
          name={ `${assetRef}.specifyWidthOrHeight` }
          component={ SelectField }
        >
          <MenuItem key='width'  value='width'  primaryText='Specify desired width' />
          <MenuItem key='height' value='height' primaryText='Specify desired height' />
        </Field>
        <Field
          name={ `${assetRef}.percentageWidthOrHeight` }
          label='Percentage width/height of the quadrant'
          component={ KiwiSliderField }
          defaultValue={ 1 }
          min={ 1 }
          step={ 1 }
          max={ 100 }
        />
      </ListItem>
    ) }
  </List>
)

class LessonThemeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  static propTypes = {
    initialValues: T.object
    , slideTypes: T.array
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <form onSubmit={ handleSubmit } style={ { width: "100%", height: "100%" } }>
        <Field
          name='name'
          hintText='Theme Name'
          component={ renderTextField }
        />
        <h4>Background</h4>
        <Field
          name='foregroundColor'
          placeholder='Ground Color (HEX, e.g. #000000)'
          component={ renderTextField }
        />
        <h5>Colors</h5>
        <Field
          name='backgroundColor'
          placeholder='Sky Color (HEX, e.g. #000000)'
          component={ renderTextField }
        />
        <h5>Images</h5>
        <Field
          name='foregroundImageUrl'
          placeholder='Ground Image URL'
          component={ renderTextField }
        />
        <Field
          name='foregroundImageWidth'
          placeholder='Ground Width (px)'
          component={ renderTextField }
        />
        <Field
          name='foregroundImageHeight'
          placeholder='Ground Height (px)'
          component={ renderTextField }
        />
        <Field
          name='backgroundImageUrl'
          placeholder='Sky Image URL'
          component={ renderTextField }
        />
        <Field
          name='backgroundImageWidth'
          placeholder='Sky Width (px)'
          component={ renderTextField }
        />
        <Field
          name='backgroundImageHeight'
          placeholder='Sky Height (px)'
          component={ renderTextField }
        />
        <Field
          name='horizonY'
          label='Horizon point (Percentage down the page)'
          component={ KiwiSliderField }
          defaultValue={ 0 }
          min={ 0 }
          step={ 1 }
          max={ 100 }
        />
        <FieldArray
          name="assets"
          component={ renderAssets }
        />
        <RaisedButton type="submit" onClick={ handleSubmit } disabled={ submitting }>
          Save
        </RaisedButton>
        { submitting && <span>Saving...</span> }
      </form>
    )
  }
}

LessonThemeForm = reduxForm({
  form: formName
  , enableReinitialize: true
  //, destroyOnUnmount: !module.hot
})(LessonThemeForm)

export default withRouter(LessonThemeForm)
