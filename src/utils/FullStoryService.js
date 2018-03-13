class FullStoryService {
  /**
   * @param {String} userID
   */
  static setIdentity(userID) {
    if(window && window.FS) {
      window.FS.identify(userID, { userID: userID });
    }
  }
}

export default FullStoryService