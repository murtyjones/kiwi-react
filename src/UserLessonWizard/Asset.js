import React, { Component } from 'react'

const styles = {
  asset: {
    display: 'inline-block'
    , position: 'absolute'
    , zIndex: 0
  }
}

const Asset = ({ asset }) =>
  <img
    key={ asset.url }
    src={ asset.url }
    style={ {
      ...styles.asset
      , [asset.relativeToTopOrBottom]: `${asset.y}%`
      , [asset.relativeToLeftOrRight]: `${asset.x}%`
      , [asset.specifyWidthOrHeight]: `${asset.percentageWidthOrHeight}%`
      , minWidth: `${asset.minWidthOrHeight ? asset.minWidthOrHeight : 0}`
    } }
  />

export default Asset