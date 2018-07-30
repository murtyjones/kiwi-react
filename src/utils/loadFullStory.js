import moment from 'moment'

const loadFullStory = store => {
  //only load full story on kiwi sites
  if (window.location.host.indexOf('kiwicompute.com') === -1) {
    return
  }

  //we don't want to load full story on any dev environment
  if (window.location.host.indexOf('dev.kiwicompute.com') >= 0
    || window.location.host.indexOf('integration.kiwicompute.com') >= 0
    || window.location.host.indexOf('stage.kiwicompute.com') >= 0
    || window.location.host.indexOf('localhost') >= 0
  ) {
    return
  }

  window['_fs_debug'] = false
  window['_fs_host'] = 'fullstory.com'
  window['_fs_org'] = '84476'
  window['_fs_namespace'] = 'FS'
  ;(function(m, n, e, t, l, o, g, y){
    if (e in m && m.console && m.console.log) {
      m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].')
      return
    }
    if (e in m && m.console && m.console.log) {
      m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].')
      return
    }
    g = m[e] = function(a, b) {
      g.q ? g.q.push([a, b]) : g._api(a, b)
    }
    g.q = []
    o = n.createElement(t)
    o.async = 1
    o.src = 'https://' + window._fs_host + '/s/fs.js'
    y = n.getElementsByTagName(t)[0]
    y.parentNode.insertBefore(o, y)
    g.identify = function(i, v) {
      g(l, {
        uid: i
      })
      if (v) g(l, v)
    }
    g.setUserVars = function(v) {
      g(l, v)
    }
    g.identifyAccount = function(i, v) {
      o = 'account'
      v = v || {}
      v.acctId = i
      g(o, v)
    }
    g.clearUserCookie = function(c, d, i) {
      if (!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[``]*`')) {
        d = n.domain
        while (1) {
          n.cookie = 'fs_uid=;domain=' + d +
            ';path=/;expires=' + new Date(0).toUTCString()
          i = d.indexOf('.')
          if (i < 0) break
          d = d.slice(i + 1)
        }
      }
    }
  })(window, document, window._fs_namespace, 'script', 'user')

  const initialState = store.getState()

  // Setting up a listener to add the FS user
  // cookie if somebody just logged in
  const initialUserId = initialState.auth.userId
  const unsubscribe = store.subscribe(() => {
    if (window.FS) {
      const { auth: { isLoggedIn, userId, username } } = store.getState()
      if (isLoggedIn && initialUserId !== userId) {
        const sessionTime = moment.utc().format()
        const sessionId = `${userId}-${sessionTime}`
        window.FS.identify(userId, {
          displayName: username,
          sessionId_str: sessionId
        })
        unsubscribe()
      }
    }
  })

}

export default loadFullStory
