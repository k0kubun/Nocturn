import { ipcRenderer } from 'electron';
import Actions         from '../actions';

export default class IpcAction {
  constructor(document) {
    this.document = document;
  }

  subscribe(store) {
    ipcRenderer.on('invoke-reply', (event) => {
      let state = store.getState();
      let activeAccount = state.accounts[state.activeAccountIndex];
      let activeTab = state.selectedTabByUserId[activeAccount.id] || 'home';
      let tweets = state.tabsByUserId[activeAccount.id] && state.tabsByUserId[activeAccount.id][activeTab];
      let selectedTweetId = state.selectedTweetIdsByUserId[activeAccount.id] && state.selectedTweetIdsByUserId[activeAccount.id][activeTab];

      let tweet = this.findTweet(tweets, selectedTweetId);
      if (!tweet) return null;

      store.dispatch(Actions.setText(`@${tweet.user.screen_name} `));
      store.dispatch(Actions.setInReplyTo(tweet));

      // FIXME: Use better way to focus
      document.getElementById('tweet_editor').focus();
    })
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
