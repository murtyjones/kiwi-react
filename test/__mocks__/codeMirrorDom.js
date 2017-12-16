import jsdom from 'jsdom-no-contextify'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
global.document.body.createTextRange = function() {
  return {
    setEnd: function(){},
    setStart: function(){},
    getBoundingClientRect: function(){
      return {right: 0};
    },
    getClientRects: function(){
      return {
        length: 0,
        left: 0,
        right: 0
      }
    }
  }
}