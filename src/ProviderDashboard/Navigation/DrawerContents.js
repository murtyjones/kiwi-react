import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ChevronRight from '@material-ui/icons/ChevronRight'
import AccountBox from '@material-ui/icons/AccountBox'
import CreditCard from '@material-ui/icons/CreditCard'
import LockOutline from '@material-ui/icons/LockOutline'
import RecentActors from '@material-ui/icons/RecentActors'
import People from '@material-ui/icons/People'
import { withStyles } from '@material-ui/core/styles'
import cns from 'classnames'

import Billing from '../Billing/Billing'
import Subscriptions from '../Subscriptions/Subscriptions'
import Students from '../Students/Students'
import ChangePassword from '../ChangePassword/ChangePassword'
import Account from '../Account/Account'
import { insertIntoObjectIf } from '../../utils/insertIf'

export const MENU_ITEMS = [
  { label: 'My Account', section: 'account', component: Account, Icon: AccountBox },
  { label: 'My Students', section: 'students', component: Students, Icon: People },
  { label: 'Subscriptions', section: 'subscriptions', component: Subscriptions, Icon: RecentActors },
  { label: 'My Password', section: 'reset-password', component: ChangePassword, Icon: LockOutline },
  { label: 'Billing Information', section: 'billing', component: Billing, Icon: CreditCard }
]

const highlightColor = '#765C9F'

const styles = theme => ({
  root: {
    padding: 0,
    fontFamily: 'Roboto'
  },
  menuItem: {
    borderBottom: '1px solid #EEEEEE'
    , color: '#AAAAAA'
    , '&:hover': {
      backgroundColor: '#f7f7f7'
    }
    , '&:hover > *': {
      color: highlightColor
    }
  },
  menuItemActive: {
    color: '#000'
  },
  menuItemText: {

  },
  menuItemTextActive: {
    fontWeight: 'bold'
  },
  chevron: {
    position: 'absolute'
    , top: '7px'
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
          <ListItemText
            classes={{
              root: cns(classes.menuItemText, {
                [classes.menuItemTextActive]: isActive
              })
            }}
            primary={ label }
            disableTypography={ true }
          />
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
