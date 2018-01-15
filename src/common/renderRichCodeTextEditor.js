import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import insertIf from '../utils/insertIf'

const modules = {
  toolbar: [
    [
      { 'font': ['monospace'] }
    ],
    [
      { size: [] }, { color: [] }
    ],
    [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
    [
      { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }
    ]
  ]
}

const formats = [
  'font',
  'size', 'color',
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
      value={ props.input.value }
      modules={ modules }
      formats={ formats }
      style={ props.style }
      onChange={ props.input.onChange }
    />
  ]
}

export default renderRichTextEditor