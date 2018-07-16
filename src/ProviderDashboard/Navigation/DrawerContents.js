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
import Students from '../Students/Students'
import Account from '../Account/Account'
import { insertIntoObjectIf } from '../../utils/insertIf'

export const MENU_ITEMS = [
  { label: 'My Account', section: 'account', component: Account, Icon: AccountBox },
  { label: 'Students', section: 'students', component: Students, Icon: RecentActors },
  { label: 'Billing', section: 'billing', component: Billing, Icon: CreditCard }
]

const highlightColor = '#765C9F'

const styles = theme => ({
  root: {
    padding: 0,
    fontFamily: 'Roboto',
    [theme.breakpoints.up('md')]: {
      width: 700
    }
  },
  menuItem: {
    borderBottom: '1px solid #EEEEEE'
    , color: '#AAAAAA'
    , '&:hover': {
      backgroundColor: '#f7f7f7'
    }
    , '&:hover > *': {
      color: highlightColor
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: 160,
      border: 'none',
      height: '100%',
      paddingTop: 15,
      '&:hover': {
        borderBottom: `2px solid ${highlightColor}`,
        background: 'none'
      }
    }
  },
  icon: {
    color: '#AAAAAA',
    [theme.breakpoints.up('md')]: {
      verticalAlign: 'top',
      marginRight: 7
    }
  },
  iconActive: {
    color: highlightColor,
  },
  menuItemActive: {
    color: highlightColor,
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: 160,
      borderBottom: `2px solid ${highlightColor}`
    }
  },
  menuItemText: {
    [theme.breakpoints.up('md')]: {
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
