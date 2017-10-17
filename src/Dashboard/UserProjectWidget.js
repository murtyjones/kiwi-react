import React from 'react'
import { Link } from 'react-router-dom'

let UserProjectWidget = props => {
  const { project: { title, _id } } = props
  //not ideal, but for the moment I need a quick and dirty way to store the title
  //alternatives are redux and maybe an option to push it through link, but I a cursory glance doesnt find it.
  //or possibly we dont use link...hmmm...
  //this is an annoying architecture question
  //--peter

  localStorage.setItem("projectTitle", title)
  localStorage.setItem("projectId", _id)

  return (
    <div>
      <Link to={ `/project/${_id}` }>{ title }</Link>
    </div>
  )
}

export default UserProjectWidget
