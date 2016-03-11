import { ipcRenderer } from 'electron';
import Actions         from '../actions';

class RichState {
  constructor(store) {
    this.state = store.getState();
  }

  activeAccount() {
    if (this.activeAccountCache) return this.activeAccountCache;
    return this.activeAccountCache = this.state.accounts[this.state.activeAccountIndex];
  }

  activeTab() {
    if (this.activeTabCache) return this.activeTabCache;
    return this.activeTabCache = (this.state.selectedTabByUserId[this.activeAccount().id] || 'home');
  }

  selectedTweetId() {
    if (this.selectedTweetIdCache) return this.selectedTweetIdCache;
    return this.selectedTweetIdCache = (
      this.state.selectedTweetIdsByUserId[this.activeAccount().id] &&
      this.state.selectedTweetIdsByUserId[this.activeAccount().id][this.activeTab()]
    );
  }

  activeTabTweets() {
    if (this.activeTabTweetsCache) return this.activeTabTweetsCache;
    return this.activeTabTweetsCache = (
      this.state.tabsByUserId[this.activeAccount().id] &&
      this.state.tabsByUserId[this.activeAccount().id][this.activeTab()]
    );
  }

  activeTweet() {
    if (this.activeTweetCache) return this.activeTweetCache;
    return this.activeTweetCache = this.findTweet(
      this.activeTabTweets(),
      this.selectedTweetId(),
    );
  }

  findTweet(tweets, id_str) {
    if (!tweets || !id_str) return null;

    for (let tweet of tweets) {
      if (tweet.id_str === id_str) {
        return tweet;
      }
    }
    return null;
  }
}

export default class IpcAction {
  constructor(document) {
    this.document = document;
  }

  subscribe(store) {
    ipcRenderer.on('invoke-reply', (event) => {
      let state = new RichState(store);
      let tweet = state.activeTweet();
      if (!tweet) return null;

      store.dispatch(Actions.setText(`@${tweet.user.screen_name} `));
      store.dispatch(Actions.setInReplyTo(tweet));

      // FIXME: Use better way to focus
      this.document.getElementById('tweet_editor').focus();
    })
  }
}
