import React, { Component } from 'react'

const styles = {
  sectionOne: {
    height: '37vh'
    , position: 'relative'
    , overflow: 'auto'
  }
}

const SectionOne = () =>
  <img
    src='../../../assets/images/kiwi_logo_large_color.svg'
    style={ styles.sectionOne }
  />

export default SectionOne