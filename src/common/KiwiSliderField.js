import React, { Component } from 'react'
import { Slider } from 'material-ui'


class KiwiSelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue
    }
  }

  render() {
    const { min, max, defaultValue, step, onDragStop, input, label, type, meta: { touched, error } } = this.props
    const { value } = this.state

    return (
      <div>
        <label>
          { label } (Current: { value })
        </label>
        <div>
          <Slider
            defaultValue={ defaultValue }
            min={ min }
            max={ max }
            step={ step }
            onChange={ (e, v) => this.setState({ value: v }) }
            onDragStop={ () => input.onChange(value) }
          />
          { touched && error && <span>{ error }</span> }
        </div>
      </div>
    )
  }
}


export default KiwiSelectField