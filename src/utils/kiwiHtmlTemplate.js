import template from 'es6-template-strings'

const kiwiHtmlTemplate = (input, variableValues) => {
  let html = input
  console.log(html)
  if (variableValues) {
    html = template(input, variableValues)
  }
  html = html.replace('\t', ' &emsp;&emsp;&emsp;&emsp;')
  console.log(html)
  return html
}

export default kiwiHtmlTemplate