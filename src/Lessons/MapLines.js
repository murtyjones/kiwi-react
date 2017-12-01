import React from 'react'
import { Line } from 'react-konva'

import { LESSON_MAP_POINTS } from '../constants'

const activeLineColor = '#696969'
const inactiveColor = '#BDBDBD'

const styles = {
  lineStyle: {
    strokeWidth: 5
    , lineCap: 'round'
    , lineJoin: 'round'
    , tension: 0.5
  }
}

const generateActiveLinePoints = (activeLessons, MAP) => {
  // turn each lesson into a pair of coordinates
  const lessonCoordinates = activeLessons.map((each, i) => {
    const map_index = i + 1 // needed because we start from 1 in the map
    const list = []
    list.push(MAP[`CIRCLE_${map_index}_X`])
    list.push(MAP[`CIRCLE_${map_index}_Y`])
    if(map_index !== activeLessons.length) {
      list.push(...MAP[`LINE_POINT_${map_index}`])
    }
    return list
  })
  // reduce  and return various coordinates into one list of coordinates
  return lessonCoordinates.reduce((acc, each) => {
    acc.push(...each)
    return acc
  }, [])
}

const generateInactiveLinePoints = (inactiveLessons, MAP, startsAfter) => {
  // turn each lesson into a pair of coordinates
  const lessonCoordinates = inactiveLessons.map((each, i) => {
    const map_index = i + 1 + startsAfter // needed because we start from 1 in the map
    const list = []
    if(map_index - 1 > 0) {
      list.push(...MAP[`LINE_POINT_${map_index - 1}`])
    }
    list.push(MAP[`CIRCLE_${map_index}_X`])
    list.push(MAP[`CIRCLE_${map_index}_Y`])
    return list
  })
  // reduce  and return various coordinates into one list of coordinates
  return lessonCoordinates.reduce((acc, each) => {
    acc.push(...each)
    return acc
  }, [])
}

const MapLines = ({ activeLessons, inactiveLessons, width }) => {
  const MAP = LESSON_MAP_POINTS(width)

  const linePointsActive = generateActiveLinePoints(activeLessons, MAP)
  const _linePointsInactive = generateInactiveLinePoints(inactiveLessons, MAP, activeLessons.length)

  const linePointsInactive = [
    ...linePointsActive.slice(-2)
    , ..._linePointsInactive
  ]
  return [
    <Line
      key={ 1 }
      points={ linePointsActive }
      stroke={ activeLineColor }
      { ...styles.lineStyle }
    />
    ,
    <Line
      key={ 2 }
      points={ linePointsInactive }
      stroke={ inactiveColor }
      { ...styles.lineStyle }
    />
  ]
}

export default MapLines