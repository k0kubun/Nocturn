BrowserWindow  = require('browser-window')
JsonLoader     = require('./json_loader')
NodeTwitterApi = require('node-twitter-api')

succeed = false
authWindow = null

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
      authWindow = new BrowserWindow({ width: 800, height: 600 })
      authWindow.webContents.on('will-navigate', (event, url) =>
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
          nodeTwitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) =>
            return if error
            succeed = true
            callback({ accessToken: accessToken, accessTokenSecret: accessTokenSecret })
          )
        event.preventDefault()
        authWindow.close()
      )
      authWindow.on('closed', ->
        authWindow = null
        new Authentication(callback) unless succeed
      )
      authWindow.loadUrl(url)
    )
