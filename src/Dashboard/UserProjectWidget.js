import React from 'react'
import { KiwiLink } from '../common/KiwiLinks'

let UserProjectWidget = props => {
  const { project: { title, _id } } = props

  return (
    <div>
      <KiwiLink to={ `/project/${_id}` }>{ title }</KiwiLink>
    </div>
  )
}

export default UserProjectWidget
