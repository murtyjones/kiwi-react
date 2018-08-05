import React from 'react'

const KiwiLoading = () =>
  <div style={ {
    position: 'absolute',
    top: '50%',
    left: '50%'
  } }>
    <div className='kiwi-spinner' />
  </div>

export default KiwiLoading