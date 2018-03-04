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
    , color: '#FFFFFF'
    , textAlign: 'center'
  },
  forgot: {
    display: 'block'
    , marginTop: '10px'
    , fontSize: '12px'
    , color: '#bbbbbb'
  },
  buttonContainer: {
    textAlign: 'center'
  },
  greenButton: {
    borderImage: 'url(../../assets/images/landing-button_border-green.svg)'
    , borderImageSlice: '24'
    , borderImageWidth: '10px'
    , borderImageOutset: '5'
    , borderImageRepeat: 'stretch'
    , height: '31px'
    , backgroundColor: '#99BE41'
    , fontSize: '14pt'
    , fontWeight: 'bold'
    , color: 'white'
    , cursor: 'pointer'
    , margin: '15px 0'
  }
}

export { styles, inactiveColor, activeColor }