export default function immutablySwapItems(items, firstIndex, secondIndex) {
  // Constant reference - we can still modify the array itself
  const results = items.slice()
  const firstItem = items[firstIndex]
  results[firstIndex] = items[secondIndex]
  results[secondIndex] = firstItem

  return results
}