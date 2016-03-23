// While adding a tweet to timeline, add a tweet to mentions if it's a mention.
export default class TimelineProxy {
  constructor(addTweetFunc, account, notify = false) {
    this.addTweetFunc = addTweetFunc;
    this.account      = account;
    this.notify       = notify;
  }

  addTweet(tweet) {
    this.addTweetFunc(tweet, this.account, 'home');

    if (tweet.entities && tweet.entities.user_mentions) {
      for (let mention of tweet.entities.user_mentions) {
        if (mention.id_str == this.account.id_str) {
          this.addTweetFunc(tweet, this.account, 'mentions');
          if (this.notify) this.notifyMention(tweet);
        }
      }
    }
  }

  notifyMention(tweet) {
    if (this.account.id_str !== tweet.user.id_str) {
      new Notification(
        `@${tweet.user.screen_name} - Reply from ${tweet.user.name}`,
        { body: tweet.text },
      );
    }
  }
}
