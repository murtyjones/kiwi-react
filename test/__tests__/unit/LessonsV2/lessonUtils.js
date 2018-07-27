import mockApiFetch from '../../../__mocks__/ApiFetch'
jest.mock('../../../../src/utils/ApiFetch', () => mockApiFetch)
import localStorageMock from '../../../__mocks__/localstorage'
import '../../../__mocks__/config'
import config from 'config'


// couldn't quite get this mock to work correctly:
jest.doMock('../../../../src/LessonMap/LESSON_CONSTANTS', {
  lessonBubbleDisplayDataBySection: [
    [
      { x: 0, y: 0 }, // 0
      { x: 0, y: 0 }, // 1
    ],
    [
      { x: 0, y: 0 } // 2
    ],
  ]
})
import * as lessonUtils from '../../../../src/LessonMap/lessonUtils'

window.localStorage = localStorageMock


describe('Auth Actions', () => {

  describe('getActiveSectionIndex', () => {
    let orderedCombinedLessonData
    beforeEach(async () => {

    })

    it('should return section 0', () => {
      // orderedCombinedLessonData = [
      //   {
      //     lesson: {
      //       _id: 0,
      //       blah: 'blah'
      //     },
      //     userLesson: { blah: 'blah' }
      //   },
      //   {
      //     lesson: {
      //       _id: 1,
      //       blah: 'blah'
      //     },
      //     userLesson: {
      //       blah: 'blah',
      //       hasBeenCompleted: true
      //     }
      //   }
      // ]
      // const result = lessonUtils.getActiveSectionIndex(orderedCombinedLessonData)
      // expect(result).toEqual(0)
    })

    it('should return section 1', () => {
      // orderedCombinedLessonData = [
      //   { lesson: { _id: 0, blah: 'blah'}, userLesson: { blah: 'blah' } },
      //   { lesson: { _id: 1, blah: 'blah'}, userLesson: { blah: 'blah' } },
      //   { lesson: { _id: 2, blah: 'blah'}, userLesson: { blah: 'blah' } }
      // ]
      // const result = lessonUtils.getActiveSectionIndex(orderedCombinedLessonData)
      // expect(result).toEqual(1)
    })

  })

})