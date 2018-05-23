import React, { Component } from 'react'
import Slider from 'material-ui/Slider'


class renderSliderField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue
    }
  }

  componentDidMount() {
    const { input: { value } } = this.props
    if(value) {
      this.setState({ value })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.input.value !== nextProps.input.value) {
      this.setState({ value: nextProps.input.value })
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
            value={ value }
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


export default renderSliderField