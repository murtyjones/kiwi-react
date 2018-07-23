const inactiveColor = '#2E2860'
const activeColor = '#2E2860'

const styles = {
  field: {
    width: '100%'
    , color: '#2E2860'
  },
  input: {
    color: '#2E2860'
  },
  underlineStyle: {
    borderBottom: `3px solid ${inactiveColor}`
  },
  underlineFocusStyle: {
    borderBottom: `3px solid ${activeColor}`
  },
  hintStyle: {
    fontWeight: 'bold'
    , display: 'none'
  },
  error: {
    display: 'block'
    , fontWeight: 'bold'
    , color: '#FF5472'
    , padding: '5px 0'
  },
  sent: {
    display: 'block'
    , fontWeight: 'bold'
    , color: '#000000'
    , textAlign: '-webkit-center'
  },
  forgot: {
    display: 'block'
    , marginTop: '10px'
    , fontSize: '12px'
    , color: '#bbbbbb'
  },
  buttonContainer: {
    textAlign: '-webkit-center'
  }
}

export { styles, inactiveColor, activeColor }
