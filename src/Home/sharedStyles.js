const inactiveColor = '#2E2860'
const activeColor = '#FFFFFF'

const styles = {
  field: {
    width: '100%'
    , color: '#FFFFFF'
  },
  input: {
    color: '#FFFFFF'
  },
  underlineStyle: {
    borderBottom: `3px solid ${inactiveColor}`
  },
  underlineFocusStyle: {
    borderBottom: `3px solid ${activeColor}`
  },
  hintStyle: {
    fontWeight: 'bold'
  },
  error: {
    display: 'inline-block'
    , fontWeight: 'bold'
    , color: '#d45e75'
    , padding: '5px 0'
  },
  forgot: {
    display: 'block'
    , marginTop: '10px'
    , fontSize: '12px'
    , color: '#bbbbbb'
  }
}

export { styles, inactiveColor, activeColor }