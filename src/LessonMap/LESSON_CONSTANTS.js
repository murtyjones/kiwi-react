export const lessonBubbleDisplayDataBySection = [
  [ // sectionIndex 0
    { x: 19, y: 36, left: undefined },  // lessonIndex 0
    { x: 19, y: 48, left: undefined },
    { x: 18, y: 63, left: undefined },
    { x: 21, y: 74, left: undefined },
    { x: 32, y: 75, left: undefined },
    { x: 43, y: 74, left: undefined },
    { x: 46, y: 60, left: undefined },
    { x: 38, y: 45, left: undefined },
    { x: 41, y: 25, left: undefined },
    { x: 41, y: 25, left: undefined },
    { x: 47, y: 19, left: undefined },
    { x: 54, y: 14, left: undefined },
    { x: 61, y: 13, left: undefined },
    { x: 68, y: 14, left: undefined },
    { x: 74, y: 19, left: undefined },
    { x: 79, y: 27, left: undefined },
    { x: 82, y: 37, left: undefined },
    { x: 80, y: 59, left: undefined },
    { x: 83, y: 75, left: undefined },  // lessonIndex 18
  ],
  [ // sectionIndex 1
    { x: 5 , y: 5 , left: undefined },  // lessonIndex 19
    { x: 5 , y: 5 , left: undefined },
    { x: 5 , y: 5 , left: undefined },  // lessonIndex 21

  ],
  [ // sectionIndex 2
    { x: 5 , y: 5 , left: undefined },  // lessonIndex 22
  ],
]

export const NAV_OPTIONS = {
  TOP:    'TOP',
  RIGHT:  'RIGHT',
  LEFT:   'LEFT',
  BOTTOM: 'BOTTOM',
}

export const lessonMapNavigationDataBySection = [
  { // sectionIndex 0
    unlocksSectionIndices: [
      1
    ],
    adjacentSectionIndices: {
      [NAV_OPTIONS.TOP]: null,
      [NAV_OPTIONS.LEFT]: null,
      [NAV_OPTIONS.BOTTOM]: 1,
      [NAV_OPTIONS.RIGHT]: null,
    }
  },
  { // sectionIndex 1
    unlocksSectionIndices: [
      0
    ],
    adjacentSectionIndices: {
      [NAV_OPTIONS.TOP]: 0,
      [NAV_OPTIONS.LEFT]: null,
      [NAV_OPTIONS.BOTTOM]: 2,
      [NAV_OPTIONS.RIGHT]: null,
    }
  }
]