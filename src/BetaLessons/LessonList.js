import React, { Fragment } from 'react'
import get from 'lodash/get'
import cns from 'classnames'
import CheckCircle from 'material-ui-icons/CheckCircle'
import Lock from 'material-ui-icons/Lock'
import LockOpen from 'material-ui-icons/LockOpen'
import Card from 'material-ui/Card'

import KiwiLink from '../common/KiwiLink'

const LeftIcon = ({ Icon, color }) =>
  <div className='leftIcon'>
    <Icon
      style={ {
        color
      } }
    />
  </div>

const LinkWrapper = ({ link, children }) =>
  link
    ? <KiwiLink to={ link }>{ children }</KiwiLink>
    : <div>{ children }</div>

const LessonList = props =>
  <Fragment>
    { (props.lessons || []).map(each => {
      const isUnlocked = each._id === props.activeLessonId
      const isCompleted = get(each, 'userLesson.hasBeenCompleted')
      return (
        <LinkWrapper
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
                  isUnlocked ? '#000' : isCompleted ? '#4F8A10' : '#CCC'
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

export default LessonList
