import { Field, FieldArray } from 'redux-form'
import RecoveryImages from './slides/RecoveryImages'
import FinalSlide from './slides/FinalSlide'

const slides = [
  {
    component: RecoveryImages
    , title: 'Pick your recovery images'
    , subtitle: 'If you misplace your password, remembering these images will help you get back into your account.'
    , fieldName: 'images'
    , fieldType: FieldArray
    , action: 'upsertPasswordRecoveryImages'
  },
  {
    component: FinalSlide
    , fieldName: '_'
    , fieldType: Field
  }
]

export default slides