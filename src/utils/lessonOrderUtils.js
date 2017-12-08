const reorderLessons = ({ event, orderOfPublishedLessons }) => {
  const movedItem = orderOfPublishedLessons.find((item, index) => index === event.oldIndex)
  const remainingItems = orderOfPublishedLessons.filter((item, index) => index !== event.oldIndex)

  return [
    ...remainingItems.slice(0, event.newIndex),
    movedItem,
    ...remainingItems.slice(event.newIndex)
  ]
}

export {
  reorderLessons
}