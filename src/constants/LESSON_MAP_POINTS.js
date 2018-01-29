const _calculateGoToPoint = (y_point) => {
  // margin above the goToPoint so that it will be near but
  // not quite at the top of the page
  const margin = 15
  // divider so that the number can be multiplied by the window.innerHeight
  const divider = 100
  return (y_point - margin) / divider
}


// these will be expressed in vw units
const LESSON_MAP_POINTS = {
  CIRCLE_1_Y: 16.5
  , CIRCLE_1_X: 13
  , CIRCLE_1_GOTO: _calculateGoToPoint(15) // intentional mismatch

  , CIRCLE_2_Y: 32.5
  , CIRCLE_2_X: 63
  , CIRCLE_2_GOTO: _calculateGoToPoint(32.5)

  , CIRCLE_3_Y: 67
  , CIRCLE_3_X: 80
  , CIRCLE_3_GOTO: _calculateGoToPoint(67)

  , CIRCLE_4_Y: 106.5
  , CIRCLE_4_X: 26
  , CIRCLE_4_GOTO: _calculateGoToPoint(106.5)

  , CIRCLE_5_Y: 125
  , CIRCLE_5_X: 33
  , CIRCLE_5_GOTO: _calculateGoToPoint(125)

  , CIRCLE_6_Y: 155
  , CIRCLE_6_X: 66
  , CIRCLE_6_GOTO: _calculateGoToPoint(155)

  , CIRCLE_7_Y: 175
  , CIRCLE_7_X: 18
  , CIRCLE_7_GOTO: _calculateGoToPoint(175)
}

export default LESSON_MAP_POINTS