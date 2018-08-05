import cloneDeep from 'lodash/cloneDeep'

export const preload = array => cloneDeep(array).map(objectOrUrl => {
  let image = new Image()
  image.src = objectOrUrl.src ? objectOrUrl.src : objectOrUrl
  return image
})