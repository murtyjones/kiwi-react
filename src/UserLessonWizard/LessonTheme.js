import React, { Component } from 'react'
import { get } from 'lodash'

const styles = {
  themeTable: {
    height: '100%'
    , position: 'relative'
    , width: '100%'
    , zIndex: -2
  },
  themeTableRow: {
    height: '50%'
    , position: 'relative'
    , width: '100%'
    , display: 'table'
    , zIndex: -2
  },
  themeQuadrant: {
    display: 'table-cell'
    , position: 'relative'
    , height: '100%'
    , overflow: 'visible'
    , zIndex: -1
  }
}


export const LessonThemeBackground = ({ className }) =>
  <div className={ className } />


export const LessonTheme = ({ lessonTheme, themeAssetsByQuadrant, activeSlideWidth }) => {
  if(!lessonTheme) return null

  const foregroundColor = lessonTheme.foregroundColor || ''
    , foregroundImage = lessonTheme.foregroundImageUrl || ''
    , backgroundColor = lessonTheme.backgroundColor || ''
    , backgroundImage = lessonTheme.backgroundImageUrl || ''
    , backgroundImageWidth = lessonTheme.backgroundImageWidth || 0
    , backgroundImageHeight = lessonTheme.backgroundImageHeight || 0
    , foregroundImageWidth = lessonTheme.foregroundImageWidth || 0
    , foregroundImageHeight = lessonTheme.foregroundImageHeight || 0

  return (
    <div key='lessonTheme' style={ styles.themeTable }>
      <div
        key='background-background'
        style={ {
          position: 'absolute'
          , top: 0
          , left: 0
          , background: `${backgroundColor} url('${backgroundImage}')`
          , backgroundSize: `${backgroundImageWidth}px ${backgroundImageHeight}px`
          , backgroundRepeat: 'repeat'
          , height: `${lessonTheme.horizonY}%`
          , width: '100%'
          , zIndex: -2
        } }
      />
      <div
        key='background-foreground'
        style={ {
          position: 'absolute'
          , top: `${lessonTheme.horizonY}%`
          , left: 0
          , background: `${foregroundColor} url('${foregroundImage}')`
          , backgroundSize: `${foregroundImageWidth}px ${foregroundImageHeight}px`
          , backgroundRepeat: 'repeat'
          , width: '100%'
          , height: `${100-lessonTheme.horizonY}%`
          , zIndex: -2
        } }
      />
      <div
        key='top-row'
        style={ {
          ...styles.themeTableRow
          , height: `${lessonTheme.horizonY}%`
        } }
      >
        <div key='top-row-column-left' style={ styles.themeQuadrant }>
          { themeAssetsByQuadrant.topLeft }
        </div>
        <div
          key='top-row-column-middle'
          style={ {
            ...styles.themeQuadrant
            , width: activeSlideWidth
          } }
        />
        <div key='top-row-column-right' style={ styles.themeQuadrant }>
          { themeAssetsByQuadrant.topRight }
        </div>
      </div>
      <div
        key='bottom-row'
        style={ {
          ...styles.themeTableRow,
          height: `${100 - lessonTheme.horizonY}%`
        } }
      >
        <div key='bottom-row-column-left' style={ styles.themeQuadrant }>
          { themeAssetsByQuadrant.bottomLeft }
        </div>
        <div
          key='bottom-row-column-middle'
          style={ { ...styles.themeQuadrant, width: activeSlideWidth } }
        />
        <div key='bottom-row-column-right' style={ styles.themeQuadrant }>
          { themeAssetsByQuadrant.bottomRight }
        </div>
      </div>
    </div>
  )
}

export const ThemeAsset = ({ asset }) =>
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


export const sortAssetsByQuadrant = theme => {
  const assets = get(theme, 'assets', [])
  return assets.reduce((acc, asset, i) => {
    const RenderedAsset = <ThemeAsset key={ i } asset={ asset } />
    acc[asset.quadrant].push(RenderedAsset)
    return acc
  }, {
    topLeft: [], topRight: [], bottomLeft: [], bottomRight: []
  })
}