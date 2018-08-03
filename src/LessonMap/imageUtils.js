import cloneDeep from 'lodash/cloneDeep'

export const preload = array => cloneDeep(array).map(object => {
  let image = new Image()
  image.src = object.src
  return image
})