import React, { Fragment } from 'react'
import * as T from 'prop-types'
import get from 'lodash/get'
import cns from 'classnames'
import CheckCircle from 'material-ui-icons/CheckCircle'
import Lock from 'material-ui-icons/Lock'
import LockOpen from 'material-ui-icons/LockOpen'
import Card from 'material-ui/Card'

import KiwiLink from '../common/KiwiLink'
import { black, paleGrey, militaryGreen } from '../colors'

const LeftIcon = ({ Icon, color }) =>
  <div className='leftIcon'>
    <Icon
      style={ {
        color
      } }
    />
  </div>

LeftIcon.propTypes = {
  Icon: T.any,
  color: T.string,
}

const LinkWrapper = ({ link, children }) =>
  link
    ? <KiwiLink to={ link }>{ children }</KiwiLink>
    : <div>{ children }</div>

LinkWrapper.propTypes = {
  link: T.string,
  children: T.any,
}

const LessonList = ({ lessons = [], activeLessonId }) =>
  <Fragment>
    { lessons.map((each, i) => {
      const isUnlocked = each._id === activeLessonId
      const isCompleted = get(each, 'userLesson.hasBeenCompleted')
      return (
        <LinkWrapper
          key={ i }
          link={ isUnlocked || isCompleted ? `/lessons/${each._id}` : null }
        >
          <Card className='betaLessonCardContainer'>
            <div className={ cns('betaLessonCard', {
              'unlocked' :  isUnlocked,
              'locked'   : !isUnlocked,
              'completed':  isCompleted,
            }) }>
              <LeftIcon
                Icon={
                  isUnlocked ? LockOpen : isCompleted ? CheckCircle : Lock
                }
                color={
                  isUnlocked ? black : isCompleted ? militaryGreen : paleGrey
                }
              />
              <div className='betaLessonText'>
                <div className='betaLessonTitle'>{ each.title }</div>
                <div className='betaLessonSubtitle'>{ each.subtitle }</div>
              </div>
            </div>
          </Card>
        </LinkWrapper>

      )
    }) }
  </Fragment>

LessonList.propTypes = {
  lessons: T.array,
  activeLessonId: T.string
}

export default LessonList
