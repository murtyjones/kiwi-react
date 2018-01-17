import React from 'react'
import ReactQuill from 'react-quill'
import { get } from 'lodash'
import 'react-quill/dist/quill.snow.css'
import insertIf from '../utils/insertIf'

const modules = {
  toolbar: [
    [
      { size: [] }, { color: [] }, { background: [] }
    ],
    [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
    [
      { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }
    ]
  ]
}

const formats = [
  'size', 'color', 'background',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent'
]

const renderRichTextEditor = (props) => {
  return [
    ...insertIf(props.label,
      <label key='label'>{ props.label }</label>
    )
    ,
    <ReactQuill
      key='editor'
      value={ get(props, 'input.value', '') }
      modules={ modules }
      formats={ formats }
      style={ props.style }
      onChange={ get(props, 'input.onChange', null) }
    />
  ]
}

export default renderRichTextEditor