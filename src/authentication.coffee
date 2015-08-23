BrowserWindow  = require('browser-window')
NodeTwitterApi = require('node-twitter-api')

module.exports =
class Authentication
  constructor: (callback) ->
    klass = @
    nodeTwitterApi = new NodeTwitterApi
      callback: 'http://example.com',
      consumerKey: 'irPO2YcnN3sodwzP39Y3O6CTG',
      consumerSecret: 'uXkFpA4HH06P4lemq3nq8TTORRnJxj8Y3QZ4KnZYWzhFWVpc9m'

    nodeTwitterApi.getRequestToken (error, requestToken, requestTokenSecret) =>
      url = nodeTwitterApi.getAuthUrl(requestToken)
      this.window = new BrowserWindow({ width: 800, height: 600 })
      this.window.webContents.on 'will-navigate', (event, url) =>
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
          nodeTwitterApi.getAccessToken requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) =>
            callback
              accessToken: accessToken,
              accessTokenSecret: accessTokenSecret
        event.preventDefault()
        klass.window.close()

      this.window.loadUrl(url)
