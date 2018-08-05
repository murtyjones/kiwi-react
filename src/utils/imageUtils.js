import BluebirdPromise from 'bluebird'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'

const getSrc = item => get(item, 'src', '') || item

export const preloadOne = src => {
  let image = new Image()
  image.src = src
  return image
}

export const preloadMultiple = array => cloneDeep(array).map(each => {
  const src = getSrc(each)
  if (src) {
    return preloadOne(src)
  }
})


export const preloadOneAsync = src => {
  return new BluebirdPromise((resolve, reject) => {

    if (!src) {
      resolve()
    }

    let image = new Image()
    image.src = src
    image.onload = () => {
      resolve(image)
    }
    image.onerror = e => {
      console.log('hi')
      reject(e)
    }
  })
}

export const preloadMultipleAsync = array => {
  const promises = cloneDeep(array).map(each => {
    const src = getSrc(each)
    preloadOneAsync(src)
  })
  return promises
}