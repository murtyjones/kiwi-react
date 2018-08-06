import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'
import './RichTextOverrides.css'
import kiwiHtmlTemplate from "../utils/kiwiHtmlTemplate";

function insertVariable (template) {
  const cursorPosition = this.quill.getSelection().index
  const value = `\$\{${template}\}`
  this.quill.clipboard.dangerouslyPasteHTML(cursorPosition, value)
  this.quill.setSelection(cursorPosition + value.length)
}

class RichTextEditor extends Component {
  constructor (props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor()
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

    // replace tabs with four spaces
    const v = (input.value || '').replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")

    return  (
      <div className='text-editor'>
        { label && <label key='label'>{ label }</label> }
        { this.CustomToolbar() }
        <ReactQuill
          ref={ node => { this.reactQuillRef = node } }
          theme={ null }
          value={ v }
          modules={ RichTextEditor.modules }
          formats={ RichTextEditor.formats }
          style={ style }
          onChange={ input.onChange }
          onKeyDown={ e => {
            // if the tab button is pressed, we must
            // automatically move the cursor over by 3 because
            // we are replacing the tab with four spaces,
            // but quill only moves the cursor forward by one index
            if (e.which === 9) {
              const { index } = this.quillRef.getSelection()
              this.quillRef.setSelection(index + 3, 0)
            }
          } }
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