BrowserWindow  = require('browser-window')
JsonLoader     = require('./json-loader')
NodeTwitterApi = require('node-twitter-api')
TwitterClient  = require('./twitter-client')

authWindow = null

module.exports =
class Authentication
  @json_storage = 'accounts.json'

  @authorized: (callback) ->
    token = Authentication.defaultToken()
    if token && token['accessToken']
      callback()
      return

    new Authentication (token) ->
      Authentication.addToken(token, ->
        callback()
      )

  @addToken: (token, callback) ->
    twitterClient = new TwitterClient(token)
    twitterClient.verifyCredentials((user) ->
      token['screenName']   = user.screen_name
      token['profileImage'] = user.profile_image_url

      tokens = JsonLoader.read(Authentication.json_storage)
      tokens = [] unless tokens
      tokens.push(token)
      JsonLoader.write(Authentication.json_storage, tokens)

      callback()
    )

  @defaultToken: ->
    accessTokens = JsonLoader.read(Authentication.json_storage)
    return {} unless accessTokens
    return {} if accessTokens.length == 0

    accessTokens[0]

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
        event.preventDefault()
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
          nodeTwitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) =>
            if error
              authWindow.close()
              new Authentication(callback)
            else
              authWindow.close()
              authWindow = null
              callback({ accessToken: accessToken, accessTokenSecret: accessTokenSecret })
          )
        else
          authWindow.close()
          new Authentication(callback)
      )
      authWindow.on('closed', ->
        # noop
      )
      authWindow.loadUrl(url)
    )
