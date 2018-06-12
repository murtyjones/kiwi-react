import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { withStyles } from '@material-ui/core/styles'
import cns from 'classnames'

import Billing from '../Billing/Billing'
import Subscriptions from '../Subscriptions/Subscriptions'
import ChangePassword from '../ChangePassword/ChangePassword'
import Account from '../Account/Account'
import { insertIntoObjectIf } from '../../utils/insertIf'

export const MENU_ITEMS = [
  { label: 'My Account', section: 'account', component: Account, Icon: InboxIcon },
  { label: 'Billing Information', section: 'billing', component: Billing, Icon: InboxIcon },
  { label: 'My Password', section: 'reset-password', component: ChangePassword, Icon: InboxIcon },
  { label: 'Subscriptions', section: 'subscriptions', component: Subscriptions, Icon: InboxIcon }
]

const styles = theme => ({
  root: {
    padding: 0
  },
  menuItem: {
    borderBottom: '1px solid #EEEEEE'
    , color: '#b8b8b8'
    , '&:first-child': {
      backgroundColor: '#000000'
    }
  },
  menuItemActive: {
    background: 'none'
    , color: '#000000'
    , fontWeight: 'bold'
  },
  chevron: {
    position: 'absolute'
    , top: '5px'
    , right: '5px'
  }
})

const DrawerContents = ({ onSelect, activeIndex, classes }) => (
  <List className={ classes.root }>
    { MENU_ITEMS.map((each, i) => {
      const { label, Icon } = each
      const isActive = i === activeIndex
      return (
        <ListItem
          button
          dense
          key={ i }
          className={ cns(classes.menuItem, {
            [classes.menuItemActive]: isActive
          }) }
          onClick={ () => onSelect(i) }
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={ label } />
          { isActive &&
            <ChevronRight
              className={ classes.chevron }
            />
          }
        </ListItem>
      )
    }
    )}
  </List>
)

export default withStyles(styles, { withTheme: true })(DrawerContents)
