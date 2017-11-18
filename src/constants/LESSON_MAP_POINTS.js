let LESSON_MAP_POINTS
export default LESSON_MAP_POINTS = (width) => {
  const start_y = 100
  const step = 115
  return {
    CIRCLE_1_Y: start_y
    , CIRCLE_1_X: 130

    , LINE_POINT_1: [
      200/* W */,
      170,
      320/* W */,
      160
    ]

    , CIRCLE_2_Y: start_y + (step)
    , CIRCLE_2_X: 400

    , LINE_POINT_2: [
      400/* W */,
      290,
      280/* W */,
      280
    ]

    , CIRCLE_3_Y: start_y + (step * 2)
    , CIRCLE_3_X: 250

    , LINE_POINT_3: [
      230/* W */,
      380,
      140/* W */,
      390
    ]

    , CIRCLE_4_Y: start_y + (step * 3)
    , CIRCLE_4_X: 130

    , LINE_POINT_4: [
      170/* W */,
      530,
      280/* W */,
      490
    ]

    , CIRCLE_5_Y: start_y + (step * 4)
    , CIRCLE_5_X: 370


  }


}