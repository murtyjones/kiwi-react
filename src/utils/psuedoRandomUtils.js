import randomWords from 'random-words'

export const generateTempPassword = () =>
  `${randomWords({ exactly: 1, wordsPerString: 1 })[0]}${Math.floor((Math.random() * 99999) + 1)}`