import FullPageText from './SlideConfigs/FullPageText'
import FullPageCode from './SlideConfigs/FullPageCode'
import Title from './SlideConfigs/Title'
import MultipleChoice from './SlideConfigs/MultipleChoice'
import FullPageCodeExample from './SlideConfigs/FullPageCodeExample'
import Narration from './SlideConfigs/Narration'

import { LESSON_SLIDE_TYPES } from '../../constants'

let slideTypes

slideTypes = [
  {
    label: 'Narration'
    , value: LESSON_SLIDE_TYPES.NARRATION
    , component: Narration
  },
  {
    label: 'Full page instructions'
    , value: LESSON_SLIDE_TYPES.FULL_PAGE_TEXT
    , component: FullPageText
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
