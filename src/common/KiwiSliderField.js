import React, { Component } from 'react'
import { Slider } from 'material-ui'

// const KiwiSelectField = ({ min, max, defaultValue, onDragStop, input, label, type, meta: { touched, error } }) =>
//   <div>
//     <label>
//       { label }
//     </label>
//     <div>
//       <Slider
//         defaultValue={ defaultValue }
//         min={ min }
//         max={ max }
//         // onDragStop={ onDragStop }
//         onChange={(event, value) => onDragStop(event, value)}
//       />
//       { touched && error && <span>{ error }</span> }
//     </div>
//   </div>
//
// export default KiwiSelectField



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
            onChange={(event, v) => { this.setState({ value: v }) }}
            onDragStop={ () => onDragStop(value) }
          />
          { touched && error && <span>{ error }</span> }
        </div>
      </div>
    )
  }
}


export default KiwiSelectField