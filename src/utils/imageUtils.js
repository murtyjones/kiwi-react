import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'

export const preload = array => cloneDeep(array).map(each => {
  const src = get(each, 'src', '') || each
  if (src) {
    let image = new Image()
    image.src = src
    return image
  }
})