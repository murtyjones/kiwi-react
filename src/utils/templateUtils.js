export const createVariableNameValuePair = variablesWithUserValues =>
  variablesWithUserValues.reduce((acc, each) => {
    acc[each.name] = each.value || each.defaultValue
    return acc
  }, {})