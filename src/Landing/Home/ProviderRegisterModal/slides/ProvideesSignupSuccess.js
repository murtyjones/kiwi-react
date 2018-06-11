import React, { Component } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'


export default class ProvideesSignupSuccess extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    goToPrevSlide: T.func.isRequired,
    formValues: T.object.isRequired,
  }

  render() {
    const { formValues } = this.props
    const students = formValues.providees
    return (
      <div className='providerRegisterForm-slide'>
        { students.map((e, i) =>
          <div key={ i } className='providerRegisterForm-addedStudent'>{ e.username }</div>
        ) }
        <Link to='#'
          className='providerRegisterForm-addAnotherStudent'
          onClick={ this.props.goToPrevSlide }
        >
          + Add another student
        </Link>
      </div>
    )
  }
}
