// While adding a tweet to timeline, add a tweet to mentions if it's a mention.
export default class TimelineProxy {
  constructor(addTweetFunc, account) {
    this.addTweetFunc = addTweetFunc;
    this.account      = account;
  }

  addTweet(tweet) {
    this.addTweetFunc(tweet, this.account, 'home');

    if (tweet.entities && tweet.entities.user_mentions) {
      for (let mention of tweet.entities.user_mentions) {
        if (mention.id_str == this.account.id_str) {
          this.addTweetFunc(tweet, this.account, 'mentions');
        }
      }
    }
  }
}
