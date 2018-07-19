import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ChevronRight from '@material-ui/icons/ChevronRight'
import AccountBox from '@material-ui/icons/AccountBox'
import CreditCard from '@material-ui/icons/CreditCard'
import RecentActors from '@material-ui/icons/RecentActors'
import Hidden from '@material-ui/core/Hidden'
import withStyles from '@material-ui/core/styles/withStyles'
import cns from 'classnames'

import Billing from '../Billing/Billing'
import Subscriptions from '../Subscriptions/Subscriptions'
import Account from '../Account/Account'
import { insertIntoObjectIf } from '../../utils/insertIf'

export const MENU_ITEMS = [
  { label: 'My Account', section: 'account', component: Account, Icon: AccountBox },
  { label: 'Subscriptions', section: 'subscriptions', component: Subscriptions, Icon: RecentActors },
  { label: 'Billing', section: 'billing', component: Billing, Icon: CreditCard, hide: true }
]

const highlightColor1 = '#765C9F'
const highlightColor2 = '#FFFFFF'

const styles = theme => ({
  root: {
    padding: 0,
    fontFamily: 'Roboto',
    [theme.breakpoints.up('md')]: {
      width: 700
    }
  },
  menuItem: {
    borderBottom: '1px solid #EEEEEE',
    color: '#AAAAAA',
    '&:hover': { backgroundColor: highlightColor2 },
    '&:hover > *': { color: highlightColor1 },
    [theme.breakpoints.up('md')]: {
      color: '#e6e6e6',
      display: 'inline-block',
      width: 170,
      border: 'none',
      height: '100%',
      paddingTop: 15,
      '&:hover': {
        borderBottom: `2px solid ${highlightColor2}`,
        background: 'none'
      },
      '&:hover > *': { color: highlightColor2 },
    }
  },
  icon: {
    color: '#AAAAAA',
    [theme.breakpoints.up('md')]: {
      color: '#e6e6e6',
      verticalAlign: 'top',
      marginRight: 7
    }
  },
  iconActive: {
    color: highlightColor1,
    [theme.breakpoints.up('md')]: {
      color: highlightColor2
    }
  },
  menuItemActive: {
    color: highlightColor1,
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      color: highlightColor2,
      borderBottom: `2px solid ${highlightColor2}`
    }
  },
  menuItemText: {
    fontSize: '12pt',
    [theme.breakpoints.up('md')]: {
      fontSize: '11pt',
      display: 'inline-block',
      padding: 0
    }
  },
  menuItemTextActive: {
    fontWeight: 'bold'
  },
  chevron: {
    position: 'absolute'
    , top: 7
    , right: 5
  }
})

const DrawerContents = ({ onSelect, activeIndex, classes }) => (
  <List className={ classes.root }>
    { MENU_ITEMS.map((each, i) => {
      const { label, Icon } = each
      const isActive = i === activeIndex

      if (each.hide) {
        return null
      }

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
          <ListItemIcon
            className={ cns(classes.icon, {
              [classes.iconActive]: isActive
            }) }
          >
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
          <Hidden mdUp>
            { isActive &&
              <ChevronRight
                className={ classes.chevron }
              />
            }
          </Hidden>
        </ListItem>
      )
    }
    )}
  </List>
)

export default withStyles(styles, { withTheme: true })(DrawerContents)
