import { ipcRenderer } from 'electron';
import Actions         from '../actions';
import RichState       from './rich-state'
import TwitterClient   from './twitter-client'

export default class IpcAction {
  constructor(document) {
    this.document = document;
  }

  subscribe(store) {
    ipcRenderer.on('invoke-reply', (event) => {
      let state = new RichState(store);
      let tweet = state.activeTweet();
      if (!tweet) return null;

      store.dispatch(Actions.texts.setText(`@${tweet.user.screen_name} `));
      store.dispatch(Actions.tweets.setInReplyTo(tweet));

      // FIXME: Use better way to focus
      this.document.getElementById('tweet_editor').focus();
    });

    ipcRenderer.on('invoke-retweet', (event) => {
      let state  = new RichState(store);
      let client = new TwitterClient(state.activeAccount());
      let active  = state.activeTweet();
      if (!active) return null;

      if (window.confirm(`Are you sure to retweet?: ${active.text}`)) {
        client.retweetStatus(active.id_str, (tweet) => {
          store.dispatch(Actions.tweets.addTweet(tweet, state.activeAccount(), state.activeTab()));
        });
      }
    });

    ipcRenderer.on('invoke-delete', (event) => {
      let state  = new RichState(store);
      let client = new TwitterClient(state.activeAccount());
      let active  = state.activeTweet();
      if (!active) return null;

      client.deleteStatus(active.id_str, (tweet) => {
        store.dispatch(Actions.tweets.removeTweet(tweet, state.activeAccount(), state.activeTab()));
      });
    });

    ipcRenderer.on('select-next-tab', (event) => {
      let state = new RichState(store);
      let tab   = state.nextTab();
      store.dispatch(Actions.tabs.selectTab(tab, state.activeAccount()));
    });

    ipcRenderer.on('select-prev-tab', (event) => {
      let state = new RichState(store);
      let tab   = state.prevTab();
      store.dispatch(Actions.tabs.selectTab(tab, state.activeAccount()));
    });

    ipcRenderer.on('select-next-account', (event) => {
      let state = new RichState(store);
      let index = state.nextAccountIndex();
      store.dispatch(Actions.accounts.activateAccount(index));
    });

    ipcRenderer.on('select-prev-account', (event) => {
      let state = new RichState(store);
      let index = state.prevAccountIndex();
      store.dispatch(Actions.accounts.activateAccount(index));
    });
  }
}
