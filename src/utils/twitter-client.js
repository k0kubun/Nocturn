var fs = require("fs");
var path = require("path");
var JsonLoader = require("./json-loader");
var Twitter = require("twitter");

module.exports = class TwitterClient {
  constructor(accessToken) {
    var credentials = JsonLoader.read("credentials.json");

    this.client = Twitter({
      consumer_key: credentials["consumerKey"],
      consumer_secret: credentials["consumerSecret"],
      access_token_key: accessToken["accessToken"],
      access_token_secret: accessToken["accessTokenSecret"]
    });
  }

  homeTimeline(callback) {
    return this.client.get("statuses/home_timeline", {}, function(error, tweets, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(tweets);
    });
  }

  mentionsTimeline(callback) {
    return this.client.get("statuses/mentions_timeline", {}, function(error, tweets, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(tweets);
    });
  }

  userStream(callback) {
    return this.client.stream("user", {}, function(stream) {
      stream.on("data", function(data) {
        if (data["friends"])
          {} else if (data["event"])
          {} else if (data["delete"])
          {} else if (data["created_at"]) {
          return callback(data);
        }
      });

      return stream.on("error", function(error) {
        return console.log(JSON.stringify(error));
      });
    });
  }

  updateStatus(tweet, inReplyTo) {
    if (tweet === "") {
      return;
    }

    var params = {
      status: tweet
    };

    (inReplyTo !== 0 ? params["in_reply_to_status_id"] = inReplyTo : undefined);
    return this.client.post("statuses/update", params, this.errorHandler);
  }

  favoriteStatus(tweetId, callback) {
    return this.client.post("favorites/create", {
      id: tweetId
    }, function(error, data, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback();
    });
  }

  retweetStatus(tweetId) {
    return this.client.post("statuses/retweet/" + tweetId, {}, function(error, data, response) {
      return (error ? console.log(JSON.stringify(error)) : undefined);
    });
  }

  deleteStatus(tweetId, callback) {
    path = "statuses/destroy/" + tweetId.toString();

    return this.client.post(path, {}, function(error, data, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback();
    });
  }

  verifyCredentials(callback) {
    return this.client.get("account/verify_credentials", {}, function(error, data, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(data);
    });
  }

  listsList(callback) {
    return this.client.get("lists/list", {}, function(error, data, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(data);
    });
  }

  listsStatuses(id, callback) {
    return this.client.get("lists/statuses", {
      list_id: id
    }, function(error, tweets, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return (() => {
        for (let tweet in tweets.reverse()) {
          callback(tweet);
        }
      })();
    });
  }

  searchTweets(query, callback) {
    return this.client.get("search/tweets", {
      q: query
    }, function(error, data, response) {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return (() => {
        for (let tweet in data["statuses"].reverse()) {
          callback(tweet);
        }
      })();
    });
  }

  errorHandler(error, data, response) {
    return (error ? console.log(JSON.stringify(error)) : undefined);
  }
};