import { BrowserWindow } from 'electron'
import JsonLoader        from './JsonLoader'
import NodeTwitterApi    from 'node-twitter-api'
import TwitterClient     from './TwitterClient'

export const ACCOUNTS_JSON    = 'accounts.json';
export const CREDENTIALS_JSON = 'credentials.json';

let authWindow = null;

export default class Authentication {
  static authorized(callback) {
    var token = Authentication.defaultAccount();

    if (token && token['accessToken']) {
      callback();
      return;
    }

    return new Authentication((token) => {
      return Authentication.addToken(token, () => {
        return callback();
      });
    });
  }

  static addToken(token, callback) {
    var tokens = JsonLoader.read(ACCOUNTS_JSON);
    if (tokens == null) {
      tokens = [];
    }
    tokens.push(token);
    JsonLoader.write(ACCOUNTS_JSON, Authentication.uniqTokens(tokens));
    return callback();
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
    return JsonLoader.read(ACCOUNTS_JSON) || [];
  }

  constructor(callback) {
    var credentials = JsonLoader.read(CREDENTIALS_JSON);

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

          return nodeTwitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
            if (error) {
              return new Authentication(callback);
            } else {
              var token = { accessToken: accessToken, accessTokenSecret: accessTokenSecret };
              var client = new TwitterClient(token);

              return client.verifyCredentials((user) => {
                token["screenName"]   = user.screen_name;
                token["profileImage"] = user.profile_image_url;
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
          return new Authentication(callback);
        }
      });

      authWindow.on('closed', function() {
        return authWindow = null;
      });

      if (oldWindow) {
        oldWindow.close();
      }
      return authWindow.loadURL(`${url}&force_login=true`);
    });
  }
}
