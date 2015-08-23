BrowserWindow  = require('browser-window')
JsonLoader     = require('./json_loader')
NodeTwitterApi = require('node-twitter-api')

module.exports =
class Authentication
  constructor: (callback) ->
    credentials = JsonLoader.read('credentials.json')
    nodeTwitterApi = new NodeTwitterApi({
      callback: 'http://example.com',
      consumerKey: credentials['consumerKey'],
      consumerSecret: credentials['consumerSecret'],
    })

    klass = @
    nodeTwitterApi.getRequestToken((error, requestToken, requestTokenSecret) =>
      url = nodeTwitterApi.getAuthUrl(requestToken)
      this.window = new BrowserWindow({ width: 800, height: 600 })
      this.window.webContents.on 'will-navigate', (event, url) =>
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
          nodeTwitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) =>
            callback({ accessToken: accessToken, accessTokenSecret: accessTokenSecret })
          )
        event.preventDefault()
        klass.window.close()
      this.window.loadUrl(url)
    )
