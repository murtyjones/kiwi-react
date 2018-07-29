const reservedKeywords = [
  'False',
  'class',
  'finally',
  'is',
  'return',
  'None',
  'continue',
  'for',
  'lambda',
  'try',
  'True',
  'def',
  'from',
  'nonlocal',
  'while',
  'and',
  'del',
  'global',
  'not',
  'with',
  'as',
  'elif',
  'if',
  'or',
  'yield',
  'assert',
  'else',
  'import',
  'pass',
  'break',
  'except',
  'in',
  'raise'
]


const getMatch = (input, keyword) =>
  (input.match(new RegExp(`^[ ]*${keyword}[ ]*=`, 'gm')) || []).length > 0


const getReservedKeyword = input =>
  reservedKeywords.reduce((acc, keyword) => {
    if (getMatch(input, keyword)) {
      acc = keyword
    }
    return acc
  }, '')


export default getReservedKeyword