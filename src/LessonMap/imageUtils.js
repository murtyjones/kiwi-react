import cloneDeep from 'lodash/cloneDeep'

export const preload = array => cloneDeep(array).map(src => {
  let image = new Image()
  image.src = src
  return image
})