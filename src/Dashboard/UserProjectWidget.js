import React from 'react'
import { Link } from 'react-router-dom'

let UserProjectWidget = props => {
  const { project: { title, _id } } = props
  return (
    <div>
      <Link to={ `/project/${_id}` }>{ title }</Link>
    </div>
  )
}

export default UserProjectWidget