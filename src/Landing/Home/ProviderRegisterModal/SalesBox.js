import React from 'react'

const styles = {
  container: {
    padding: '20px'
  },
  li: {
    margin: '10px 0'
  },
  header: {
    textAlign: 'center',
    color: '#624F8F'
  },
  cost: {
    color: '#CCC',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  usd: {
    color: '#66cc52'
  }
}

const SalesBox = props =>
  <div style={ styles.container }>
    <h2 style={ styles.header }>Join Kiwi To:</h2>
    <ul>
      <li style={ styles.li }>Help your child engage digitally in a fun and healthy way</li>
      <li style={ styles.li }>Use a trusted curriculum for coding education</li>
      <li style={ styles.li }>Give your student the digital support needed to become a coder</li>
    </ul>
    <h3 style={ { ...styles.header, marginBottom: 0 } }>
      Sign up today!
    </h3>
    <div style={ styles.cost }>
      <span style={ styles.usd }>30 USD</span> / month
    </div>
  </div>

export default SalesBox