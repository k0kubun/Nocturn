import { BrowserWindow } from 'electron'
import JsonLoader        from './JsonLoader'
import NodeTwitterApi    from 'node-twitter-api'
import TwitterClient     from './TwitterClient'

let authWindow = null;

export default class Authentication {
  static ACCOUNTS_JSON    = 'accounts.json';
  static CREDENTIALS_JSON = 'credentials.json';

  static authorized(callback) {
    var token = Authentication.defaultAccount();

    if (token && token['accessToken']) {
      callback();
      return;
    }

    new Authentication((token) => {
      Authentication.addToken(token, () => {
        callback();
      });
    });
  }

  static addToken(token, callback) {
    var tokens = JsonLoader.read(this.ACCOUNTS_JSON);
    if (tokens == null) {
      tokens = [];
    }
    tokens.push(token);
    JsonLoader.write(this.ACCOUNTS_JSON, Authentication.uniqTokens(tokens));
    callback();
  }

  static uniqTokens(tokens) {
    var names  = [];
    var uniqed = [];

    for (let token of tokens) {
      if (names.indexOf(token['screenName']) < 0) {
        uniqed.push(token);
        names.push(token['screenName']);
      }
    }
    return uniqed;
  }

  static byScreenName(screenName) {
    for (let account of Authentication.allAccounts()) {
      if (account['screenName'] === screenName) {
        return account;
      }
    }
    return {};
  }

  static defaultAccount() {
    var accounts = Authentication.allAccounts();

    if (accounts.length === 0) {
      return {};
    }
    return accounts[0];
  }

  static allAccounts() {
    return JsonLoader.read(this.ACCOUNTS_JSON) || [];
  }

  static credentials() {
    return JsonLoader.read(this.CREDENTIALS_JSON);
  }

  constructor(callback) {
    var credentials = Authentication.credentials();

    var nodeTwitterApi = new NodeTwitterApi({
      callback:       'http://example.com',
      consumerKey:    credentials['consumerKey'],
      consumerSecret: credentials['consumerSecret'],
    });

    var klass = this;

    nodeTwitterApi.getRequestToken((error, requestToken, requestTokenSecret) => {
      var oldWindow;
      var url = nodeTwitterApi.getAuthUrl(requestToken);
      if (authWindow) {
        oldWindow = authWindow;
      }

      authWindow = new BrowserWindow({
        width:  800,
        height: 600,
        'node-integration': false,
      });

      authWindow.webContents.on('will-navigate', (event, url) => {
        var matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
        if (matched) {
          event.preventDefault();

          nodeTwitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
            if (error) {
              new Authentication(callback);
            } else {
              var token = { accessToken: accessToken, accessTokenSecret: accessTokenSecret };
              var client = new TwitterClient(token);

              return client.verifyCredentials((user) => {
                token['id']         = user.id;
                token['screenName'] = user.screen_name;
                callback(token);
                if (authWindow) {
                  authWindow.close();
                }
              });
            }
          });
        } else if (url.match(/\/account\/login_verification/)) {
          // noop (start of 2FA session)
        } else if (url.match(/\/oauth\/authenticate/)) {
          // noop (redirection to successful callback)
        } else {
          event.preventDefault();

          // regard current session as invalid submission and retry
          new Authentication(callback);
        }
      });

      authWindow.on('closed', function() {
        authWindow = null;
      });

      if (oldWindow) {
        oldWindow.close();
      }
      authWindow.loadURL(`${url}&force_login=true`);
    });
  }
}
