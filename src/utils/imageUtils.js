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

    image.onload = () => {
      return resolve(image)
    }
    image.onerror = e => {
      return reject(e)
    }

    // keep this after onload callback is set
    image.src = src
  })
}

export const preloadMultipleAsync = async array => {
  const promises = cloneDeep(array).map(each => {
    const src = getSrc(each)
    return preloadOneAsync(src)
  })
  return BluebirdPromise.all(promises)
}