import React, { Component } from 'react'

const styles = {
  container: {
    position: 'relative'
  },
  sectionOne: {
    height: '35vh'
    , position: 'relative'
    , overflow: 'auto'
  }
}

const LogoSection = () =>
  <div style={ styles.container }>
    <img
      key={ 1 }
      src='../../../assets/images/kiwi_logo_large_color.svg'
      style={ styles.sectionOne }
    />
  </div>


export default LogoSection