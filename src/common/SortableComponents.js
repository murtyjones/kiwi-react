import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const SortableItem = SortableElement(({item, component}) => {
  const ComponentToRender = component
  return <div><ComponentToRender item={ item } /></div>
})

const SortableList = SortableContainer(({items, component}) => {
  return (
    <div>
      { items.map((item, i) => {
        return (
          <SortableItem
            component={ component }
            key={ i }
            index={ i }
            item={ item }
          />
        )
      }) }
    </div>
  )
})

export {
  SortableItem,
  SortableList
}