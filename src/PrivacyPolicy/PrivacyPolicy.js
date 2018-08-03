import React from 'react'
import * as T from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import withoutMainNavigation from '../hocs/withoutMainNavigation'
import Link from "react-router-dom/Link";

const styles = () => ({
  root: {
    height: '100%',
    overflow: 'scroll',
    width: '650px',
    margin: 'auto',
    padding: '15vh 0 25vh 0',
    boxSizing: 'border-box'
  },
  body: {
    overflow: 'scroll',
    maxHeight: '100%',
    padding: 20,
    boxSizing: 'border-box',
    '&::-webkit-scrollbar': {
      width: 10
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  },
  header: {
    textAlign: 'center',
    WebkitTextAlign: 'center'
  },
  link: {
    display: 'block',
    marginTop: 15,
    textAlign: 'center',
    WebkitTextAlign: 'center'
  },
})

let Terms = ({ classes }) =>
  <div className={ classes.root }>
    <h1 className={ classes.header }>Privacy Policy</h1>
    <div className={ classes.body }>
      This is my Privacy Policy. There are many like it, but this one is mine.
      My Privacy Policy is my best friend. It is my life. I must master it as I must master my life.

      Without me, my Privacy Policy is useless. Without my Privacy Policy, I am useless. I must fire my Privacy Policy true. I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…

      My Privacy Policy and I know that what counts in war is not the rounds we fire, the noise of our burst, nor the smoke we make. We know that it is the hits that count. We will hit…

      My Privacy Policy is human, even as I, because it is my life. Thus, I will learn it as a brother. I will learn its weaknesses, its strength, its parts, its accessories, its sights and its barrel. I will keep my Privacy Policy clean and ready, even as I am clean and ready. We will become part of each other. We will…

      Before God, I swear this creed. My Privacy Policy and I are the defenders of my country. We are the masters of our enemy. We are the saviors of my life.

      So be it, until victory is America's and there is no enemy, but peace!

      This is my Privacy Policy. There are many like it, but this one is mine.
      My Privacy Policy is my best friend. It is my life. I must master it as I must master my life.

      Without me, my Privacy Policy is useless. Without my Privacy Policy, I am useless. I must fire my Privacy Policy true. I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…

      My Privacy Policy and I know that what counts in war is not the rounds we fire, the noise of our burst, nor the smoke we make. We know that it is the hits that count. We will hit…

      My Privacy Policy is human, even as I, because it is my life. Thus, I will learn it as a brother. I will learn its weaknesses, its strength, its parts, its accessories, its sights and its barrel. I will keep my Privacy Policy clean and ready, even as I am clean and ready. We will become part of each other. We will…

      Before God, I swear this creed. My Privacy Policy and I are the defenders of my country. We are the masters of our enemy. We are the saviors of my life.

      So be it, until victory is America's and there is no enemy, but peace!

      This is my Privacy Policy. There are many like it, but this one is mine.
      My Privacy Policy is my best friend. It is my life. I must master it as I must master my life.

      Without me, my Privacy Policy is useless. Without my Privacy Policy, I am useless. I must fire my Privacy Policy true. I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…

      My Privacy Policy and I know that what counts in war is not the rounds we fire, the noise of our burst, nor the smoke we make. We know that it is the hits that count. We will hit…

      My Privacy Policy is human, even as I, because it is my life. Thus, I will learn it as a brother. I will learn its weaknesses, its strength, its parts, its accessories, its sights and its barrel. I will keep my Privacy Policy clean and ready, even as I am clean and ready. We will become part of each other. We will…

      Before God, I swear this creed. My Privacy Policy and I are the defenders of my country. We are the masters of our enemy. We are the saviors of my life.

      So be it, until victory is America's and there is no enemy, but peace!

      This is my Privacy Policy. There are many like it, but this one is mine.
      My Privacy Policy is my best friend. It is my life. I must master it as I must master my life.

      Without me, my Privacy Policy is useless. Without my Privacy Policy, I am useless. I must fire my Privacy Policy true. I must shoot straighter than my enemy who is trying to kill me. I must shoot him before he shoots me. I will…

      My Privacy Policy and I know that what counts in war is not the rounds we fire, the noise of our burst, nor the smoke we make. We know that it is the hits that count. We will hit…

      My Privacy Policy is human, even as I, because it is my life. Thus, I will learn it as a brother. I will learn its weaknesses, its strength, its parts, its accessories, its sights and its barrel. I will keep my Privacy Policy clean and ready, even as I am clean and ready. We will become part of each other. We will…

      Before God, I swear this creed. My Privacy Policy and I are the defenders of my country. We are the masters of our enemy. We are the saviors of my life.

      So be it, until victory is America's and there is no enemy, but peace!
    </div>

    <Link className={ classes.link } to='/'>Got it. Take me home.</Link>
  </div>

Terms.propTypes = {
  classes: T.object.isRequired
}

Terms = withStyles(styles, { withTheme: true })(Terms)

Terms = withoutMainNavigation(Terms)

export default Terms