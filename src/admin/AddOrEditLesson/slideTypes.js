import FullPageText from './SlideConfigs/FullPageText'
import HalfTextHalfCode from './SlideConfigs/HalfTextHalfCode'
import FullPageCode from './SlideConfigs/FullPageCode'
import Title from './SlideConfigs/Title'
import MultipleChoice from './SlideConfigs/MultipleChoice'
import FullPageCodeExample from './SlideConfigs/FullPageCodeExample'


import { LESSON_SLIDE_TYPES } from '../../constants'

let slideTypes

slideTypes = [
  {
    label: 'Full page instructions'
    , value: LESSON_SLIDE_TYPES.FULL_PAGE_TEXT
    , component: FullPageText
  },
  {
    label: 'Half instructions, half editor'
    , value: LESSON_SLIDE_TYPES.HALF_HALF
    , component: HalfTextHalfCode
  },
  {
    label: 'Full page code example'
    , value: LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EXAMPLE
    , component: FullPageCodeExample
  },
  {
    label: 'Full page code editor'
    , value: LESSON_SLIDE_TYPES.FULL_PAGE_CODE_EDITOR
    , component: FullPageCode
  },
  {
    label: 'Title'
    , value: LESSON_SLIDE_TYPES.TITLE
    , component: Title
  },
  {
    label: 'Multiple Choice'
    , value: LESSON_SLIDE_TYPES.MULTIPLE_CHOICE
    , component: MultipleChoice
  }
]

export { slideTypes }