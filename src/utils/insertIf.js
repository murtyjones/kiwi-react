const insertIf = (condition, ...elements) => {
  return condition ? elements : [];
}

export default insertIf