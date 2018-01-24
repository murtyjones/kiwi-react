import { Field, FieldArray, reduxForm, change, getFormValues } from 'redux-form'
import RecoveryImages from '../WelcomeWizard/slides/RecoveryImages'
import renderResetPassword from './slides/ResetPassword'
import renderUsernameField from './slides/Username'

const slides = [
  {
    component: renderUsernameField
    , title: "What's your username?"
    , fieldName: 'username'
    , fieldType: Field
  },
  {
    component: RecoveryImages
    , title: 'Guess your recovery images'
    , subtitle: 'To reset your password, select the three images you picked when you signed up.'
    , fieldName: 'images'
    , fieldType: FieldArray
    , action: 'checkPasswordRecoveryCorrectness'
    , handleSuccessMethod: 'handleRecoveryCheckResponse'
  },
  {
    component: renderResetPassword
    , title: 'Pick your new password'
    , fieldName: 'password'
    , fieldType: Field
    , action: 'resetPassword'
  }
]

export default slides