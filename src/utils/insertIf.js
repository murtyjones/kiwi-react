const insertIf = (condition, ...elements) => {
  return condition ? elements : [];
}

export default insertIf


export const insertIntoObjectIf = (condition, elements) => {
  return condition ? elements : [];
}