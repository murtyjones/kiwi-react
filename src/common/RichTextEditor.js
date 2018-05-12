import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'
import './RichTextOverrides.css'

function insertVariable (template) {
  const cursorPosition = this.quill.getSelection().index
  const value = `\$\{${template}\}`
  this.quill.clipboard.dangerouslyPasteHTML(cursorPosition, value)
  this.quill.setSelection(cursorPosition + value.length)
}

class RichTextEditor extends Component {
  constructor (props) {
    super(props)
  }

  CustomToolbar = () => {
    const { variableOptions } = this.props
    return (
      <div id='toolbar'>

        <select className='ql-header' value='0' onChange={e => e.persist()}>
          <option value='0'>Normal</option>
          <option value='1'>H1</option>
          <option value='2'>H2</option>
          <option value='3'>H3</option>
          <option value='4'>H4</option>
          <option value='5'>H5</option>
          <option value='6'>H6</option>
        </select>

        <button className='ql-bold'>Bold</button>
        <button className='ql-italic'>Italic</button>

        <select className='ql-color'>
          <option value='black'>Black</option>
          <option value='red'>Red</option>
          <option value='green'>Green</option>
          <option value='blue'>Blue</option>
          <option value='orange'>Orange</option>
          <option value='violet'>Violet</option>
          <option value='#d0d1d2'>Grey</option>
        </select>

        <select className='ql-background'>
          <option value='white'>White</option>
          <option value='red'>Red</option>
          <option value='green'>Green</option>
          <option value='blue'>Blue</option>
          <option value='orange'>Orange</option>
          <option value='violet'>Violet</option>
          <option value='#d0d1d2'>Grey</option>
        </select>

        <select className='ql-insertVariable' onChange={e => e.persist()}>
          { variableOptions.map(each => {
            const { _id, name } = each
            return (
              <option key={_id} value={ name }>{name}</option>
            )
          }) }
        </select>

      </div>
    )
  }

  render() {
    const { input, style, label } = this.props


    return  (
      <div className='text-editor'>
        { label && <label key='label'>{ label }</label> }
        { this.CustomToolbar() }
        <ReactQuill
          theme={null}
          value={input.value}
          modules={RichTextEditor.modules}
          formats={RichTextEditor.formats}
          style={style}
          onChange={input.onChange}
        />
      </div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
RichTextEditor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      'insertVariable': insertVariable,
    }
  }
}

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background'
]

/*
 * PropType validation
 */
// RichTextEditor.propTypes = {
//   placeholder: React.PropTypes.string,
// }


export default RichTextEditor