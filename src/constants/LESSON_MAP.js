let LESSON_MAP
export default LESSON_MAP = (width) => {
  const starting = 140
  const step = 300

  return {
    CIRCLE_1_Y: starting
    , CIRCLE_1_X: width / 5

    , CIRCLE_2_Y: starting + step
    , CIRCLE_2_X: width / 2

    , CIRCLE_3_Y: starting + (step * 2)
    , CIRCLE_3_X: width / 3.25

    , LINE_POINT_1_Y: 240
    , LINE_POINT_1_X: width / 3

    , LINE_POINT_2_Y: 600
    , LINE_POINT_2_X: width / 2
  }


}