import React, { Component, Fragment } from 'react'
import * as T from 'prop-types'
import Link from 'react-router-dom/Link'

import SlideInOut from '../../../../common/animations/SlideInOut'

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
      <SlideInOut>
        <div className='providerRegisterForm-slide'>
          { students.map((e, i) =>
            <div key={ i } className='providerRegisterForm-addedStudent'>{ e.firstName }</div>
          ) }
          <Link to='#'
            className='providerRegisterForm-addAnotherStudent'
            onClick={ this.props.goToPrevSlide }
          >
            + Add another student
          </Link>
        </div>
      </SlideInOut>
    )
  }
}
