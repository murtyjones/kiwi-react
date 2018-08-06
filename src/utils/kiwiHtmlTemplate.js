import template from 'es6-template-strings'

const kiwiHtmlTemplate = (input, variableValues) => {
  let html = input
  if (variableValues) {
    html = template(input, variableValues)
  }
  return html
}

export default kiwiHtmlTemplate