import FullPageText from './SlideConfigs/FullPageText'
import HalfTextHalfCode from './SlideConfigs/HalfTextHalfCode'
import FullPageCode from './SlideConfigs/FullPageCode'

let slideTypes

slideTypes = [
  {
    label: 'Full page instructions'
    , value: 'FULL_PAGE'
    , component: FullPageText
  }, {
    label: 'Half instructions, half editor'
    , value: 'HALF_HALF'
    , component: HalfTextHalfCode
  }, {
    label: 'Full page code editor'
    , value: 'CODE_EDITOR'
    , component: FullPageCode
  }
]

export { slideTypes }