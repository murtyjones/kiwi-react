import React from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import { mailFolderListItems, otherMailFolderListItems}  from './tileData'

const styles = theme => ({
  toolbar: theme.mixins.toolbar
})

const DrawerContents = ({ classes }) => (
  <div>
    <div className={ classes.toolbar } />
    <Divider />
    <List>{ mailFolderListItems }</List>
    <Divider />
    <List>{ otherMailFolderListItems }</List>
  </div>
)

export default withStyles(styles, { withTheme: true })(DrawerContents)
