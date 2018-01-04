const setTimeoutAsync = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default setTimeoutAsync