var BrowserWindow = require("browser-window");
var JsonLoader = require("./json-loader");
var NodeTwitterApi = require("node-twitter-api");
var TwitterClient = require("./twitter-client");
var authWindow = null;

export default class Authentication {
  static json_storage() {
    return "accounts.json";
  }

  static authorized(callback) {
    var token = Authentication.defaultAccount();

    if (token && token["accessToken"]) {
      callback();
      return;
    }

    return new Authentication(function(token) {
      return Authentication.addToken(token, function() {
        return callback();
      });
    });
  }

  static addToken(token, callback) {
    var tokens = JsonLoader.read(Authentication.json_storage());
    if (tokens == null) {
      tokens = [];
    }
    tokens.push(token);
    JsonLoader.write(Authentication.json_storage(), Authentication.uniqTokens(tokens));
    return callback();
  }

  static uniqTokens(tokens) {
    var names = [];
    var uniqed = [];

    for (let token of tokens) {
      if (names.indexOf(token["screenName"]) < 0) {
        uniqed.push(token);
        names.push(token["screenName"]);
      }
    }

    return uniqed;
  }

  static byScreenName(screenName) {
    for (let account in Authentication.allAccounts()) {
      if (account["screenName"] === screenName) {
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
    return JsonLoader.read(Authentication.json_storage()) || [];
  }

  constructor(callback) {
    var credentials = JsonLoader.read("credentials.json");

    var nodeTwitterApi = new NodeTwitterApi({
      callback: "http://example.com",
      consumerKey: credentials["consumerKey"],
      consumerSecret: credentials["consumerSecret"]
    });

    var klass = this;

    nodeTwitterApi.getRequestToken((error, requestToken, requestTokenSecret) => {
      var oldWindow;
      var url = nodeTwitterApi.getAuthUrl(requestToken);
      (authWindow ? oldWindow = authWindow : undefined);

      authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        "node-integration": false
      });

      authWindow.webContents.on("will-navigate", (event, url) => {
        var matched;

        if ((matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))) {
          event.preventDefault();

          return nodeTwitterApi.getAccessToken(
            requestToken,
            requestTokenSecret,
            matched[2],
            (error, accessToken, accessTokenSecret) => {
              if (error) {
                return new Authentication(callback);
              } else {
                var token = {
                  accessToken: accessToken,
                  accessTokenSecret: accessTokenSecret
                };

                var client = new TwitterClient(token);

                return client.verifyCredentials(function(user) {
                  token["screenName"] = user.screen_name;
                  token["profileImage"] = user.profile_image_url;
                  callback(token);
                  return (authWindow ? authWindow.close() : undefined);
                });
              }
            }
          );
        } else if (url.match(/\/account\/login_verification/))
          {} else if (url.match(/\/oauth\/authenticate/))
          {} else {
          event.preventDefault();
          return new Authentication(callback);
        }
      });

      authWindow.on("closed", function() {
        return authWindow = null;
      });

      (oldWindow ? oldWindow.close() : undefined);
      return authWindow.loadURL(url + "&force_login=true");
    });
  }
};
