import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { withStyles } from '@material-ui/core/styles'

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
  hoverColor: '#f5f5f5',
  container: {
    width: '90%'
    , margin: '0 auto'
    , borderRadius: '5px'
    , border: '1px solid #EEEEEE'
    , boxSizing: 'border-box'
    , padding: 0
  },
  list: {
    padding: 0
    , margin: 0
  },
  menuItem: {
    borderBottom: '1px solid #EEEEEE'
    , color: '#b8b8b8'
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
  <div>
    <List className={ classes.root }>
      { MENU_ITEMS.map((each, i) => {
        const { label, Icon } = each
        const isActive = i === activeIndex
        return (
          <ListItem
            button
            dense
            key={ i }
            className={ isActive ? classes.menuItem: classes.menuItemActive }
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
  </div>
)

export default withStyles(styles, { withTheme: true })(DrawerContents)
