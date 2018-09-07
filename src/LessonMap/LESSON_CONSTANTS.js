export const lessonBubbleDisplayDataBySection = [
  [ // sectionIndex 0
    { x: 19, y: 36, left: true      },  // lessonIndex 0
    { x: 19, y: 48, left: true      },
    { x: 18, y: 63, left: true      },
    { x: 21, y: 74, left: true      },
    { x: 32, y: 75, left: true      },
    { x: 43, y: 74, left: true      },
    { x: 43, y: 59, left: true      },
    { x: 38, y: 45, left: true      },
    { x: 41, y: 25, left: true      },
    { x: 47, y: 19, left: true      },
    { x: 54, y: 14, left: undefined },
    { x: 61, y: 13, left: undefined },
    { x: 68, y: 14, left: undefined },
    { x: 74, y: 19, left: undefined },
    { x: 79, y: 27, left: undefined },
    { x: 82, y: 37, left: undefined },
    { x: 80, y: 49, left: undefined },
    { x: 80, y: 62, left: undefined },
    { x: 83, y: 75, left: undefined },  // lessonIndex 18
  ],
  [ // sectionIndex 1
    { x: 22, y: 52, left: undefined },  // lessonIndex 19
    { x: 80, y: 77, left: undefined },
    { x: 88, y: 72, left: undefined },
    { x: 86, y: 42, left: undefined },
    { x: 92, y: 47, left: undefined },  // lessonIndex 23
  ]
  // don't add section here till truly ready
]

export const NAV_OPTIONS = {
  UP:    'UP',
  RIGHT: 'RIGHT',
  LEFT:  'LEFT',
  DOWN:  'DOWN',
}

export const lessonMapNavigationDataBySection = [
  { // sectionIndex 0
    adjacentSectionIndices: {
      [NAV_OPTIONS.UP]: null,
      [NAV_OPTIONS.LEFT]: null,
      [NAV_OPTIONS.DOWN]: { sectionIndex: 1, unlocksSection: true, requiresLessonsCompletion: true },
      [NAV_OPTIONS.RIGHT]: { sectionIndex: 3, unlocksSection: false },
    }
  },
  { // sectionIndex 1
    adjacentSectionIndices: {
      [NAV_OPTIONS.UP]: { sectionIndex: 0, unlocksSection: true, requiresLessonsCompletion: false },
      [NAV_OPTIONS.LEFT]: null,
      [NAV_OPTIONS.DOWN]: { sectionIndex: 2, unlocksSection: true, requiresLessonsCompletion: true },
      [NAV_OPTIONS.RIGHT]: { sectionIndex: 4, unlocksSection: false, requiresLessonsCompletion: true },
    }
  }
  // don't add section here till truly ready
]

export const lessonMapImagesBySection = [
  {
    src: 'https://res.cloudinary.com/kiwi-prod/image/upload/v1533258547/Map/section1.svg',
  },
  {
    src: 'https://res.cloudinary.com/kiwi-prod/image/upload/v1533258551/Map/section2.svg',
  }
]