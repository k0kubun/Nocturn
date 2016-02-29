BrowserWindow  = require('browser-window')
JsonLoader     = require('./json-loader')
NodeTwitterApi = require('node-twitter-api')
TwitterClient  = require('./twitter-client')

authWindow = null

module.exports =
class Authentication
  @json_storage = 'accounts.json'

  @authorized: (callback) ->
    token = Authentication.defaultAccount()
    if token && token['accessToken']
      callback()
      return

    new Authentication (token) ->
      Authentication.addToken(token, ->
        callback()
      )

  @addToken: (token, callback) ->
    tokens = JsonLoader.read(Authentication.json_storage)
    tokens = [] unless tokens
    tokens.push(token)
    JsonLoader.write(Authentication.json_storage, Authentication.uniqTokens(tokens))

    callback()

  @uniqTokens: (tokens) ->
    names  = []
    uniqed = []
    for token in tokens
      if names.indexOf(token['screenName']) < 0
        uniqed.push(token)
        names.push(token['screenName'])
    uniqed

  @byScreenName: (screenName) ->
    for account in Authentication.allAccounts()
      return account if account['screenName'] == screenName
    {}

  @defaultAccount: ->
    accounts = Authentication.allAccounts()
    return {} if accounts.length == 0

    accounts[0]

  @allAccounts: ->
    JsonLoader.read(Authentication.json_storage) || []

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
      oldWindow  = authWindow if authWindow
      authWindow = new BrowserWindow({ width: 800, height: 600, 'node-integration': false })

      authWindow.webContents.on('will-navigate', (event, url) =>
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
          event.preventDefault()
          nodeTwitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) =>
            if error
              new Authentication(callback)
            else
              token = { accessToken: accessToken, accessTokenSecret: accessTokenSecret }
              client = new TwitterClient(token)
              client.verifyCredentials((user) ->
                token['screenName']   = user.screen_name
                token['profileImage'] = user.profile_image_url
                callback(token)
                authWindow.close() if authWindow
              )
          )
        else if url.match(/\/account\/login_verification/)
          # noop (start of 2FA session)
        else if url.match(/\/oauth\/authenticate/)
          # noop (redirection to successful callback)
        else
          event.preventDefault()

          # regard current session as invalid submission and retry
          new Authentication(callback)
      )
      authWindow.on('closed', ->
        authWindow = null
      )

      if oldWindow
        oldWindow.close()
      authWindow.loadUrl(url + '&force_login=true')
    )
