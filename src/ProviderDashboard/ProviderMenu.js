import React, { Component } from 'react'
import * as T from 'prop-types'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import makeSelectable from 'material-ui/List/makeSelectable'
import ChevronRight from 'material-ui-icons/ChevronRight'

import { insertIntoObjectIf } from '../utils/insertIf'
import { MENU_ITEMS } from './ProviderDashboard'

let SelectableList = makeSelectable(List);


const styles = {
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
  menuItemInner: {
    padding: '8px 16px'
  },
  first: {
    borderRadius: '5px 5px 0 0'
  },
  last: {
    borderRadius: '0 0 5px 5px'
    , borderBottom: 0
  },
  active: {
    background: 'none'
    , color: '#000000'
    , fontWeight: 'bold'
  },
  chevron: {
    position: 'absolute'
    , top: '5px'
    , right: '5px'
  }
}

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: T.node.isRequired,
      defaultValue: T.number.isRequired,
      onValueChange: T.func.isRequired,
    }

    componentWillMount() {
      this.setState({ selectedIndex: this.props.defaultValue })
    }

    handleRequestChange = (event, index) => {
      this.setState({ selectedIndex: index })
      this.props.onValueChange(index)
    };

    render() {
      return (
        <ComposedComponent
          value={ this.state.selectedIndex }
          onChange={ this.handleRequestChange }
          style={ this.props.style }
        >
          { this.props.children }
        </ComposedComponent>
      )
    }
  }
}

SelectableList = wrapState(SelectableList);

const ProviderMenu = props =>
  <SelectableList
    defaultValue={ props.activeIndex }
    onValueChange={ props.onSelect }
    autoWidth={ true }
    style={ styles.container }
  >
    { MENU_ITEMS.map((each, i) => {
      const isFirst = i === 0
      const isLast = i + 1 === MENU_ITEMS.length
      const isActive = i === props.activeIndex
      return (
        <ListItem
          key={ i }
          value={ i }
          primaryText={ each.label }
          style={ {
            ...styles.menuItem
            , ...insertIntoObjectIf(isFirst, styles.first)
            , ...insertIntoObjectIf(isLast, styles.last)
            , ...insertIntoObjectIf(isActive, styles.active)
          } }
          innerDivStyle={ styles.menuItemInner }
          hoverColor={ styles.hoverColor }
        >
          { isActive &&
            <ChevronRight
              style={ styles.chevron }
            />
          }
        </ListItem>
      )
    }) }
  </SelectableList>

export default ProviderMenu