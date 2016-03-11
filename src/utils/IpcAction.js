import { ipcRenderer } from 'electron';
import Actions         from '../actions';
import RichState       from './RichState'
import TwitterClient   from './TwitterClient'

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

    ipcRenderer.on('select-next-tweet', (event) => {
      let state = new RichState(store);
      let tweet = state.findNextTweet();
      if (!tweet) return null;

      store.dispatch(Actions.selectTweet(tweet, state.activeTab(), state.activeAccount()));
    });

    ipcRenderer.on('select-prev-tweet', (event) => {
      let state = new RichState(store);
      let tweet = state.findPrevTweet();
      if (!tweet) return null;

      store.dispatch(Actions.selectTweet(tweet, state.activeTab(), state.activeAccount()));
    });

    ipcRenderer.on('select-first-tweet', (event) => {
      let state = new RichState(store);
      let tweet = state.findFirstTweet();
      if (!tweet) return null;

      store.dispatch(Actions.selectTweet(tweet, state.activeTab(), state.activeAccount()));
    });

    ipcRenderer.on('invoke-favorite', (event) => {
      let state  = new RichState(store);
      let client = new TwitterClient(state.activeAccount());
      let active  = state.activeTweet();
      if (!active) return null;

      client.favoriteStatus(active.id_str, (tweet) => {
        store.dispatch(Actions.addTweet(tweet, state.activeAccount(), state.activeTab()));
      });
    });

    ipcRenderer.on('invoke-retweet', (event) => {
      let state  = new RichState(store);
      let client = new TwitterClient(state.activeAccount());
      let active  = state.activeTweet();
      if (!active) return null;

      if (window.confirm(`Are you sure to retweet?: ${active.text}`)) {
        client.retweetStatus(active.id_str, (tweet) => {
          store.dispatch(Actions.addTweet(tweet, state.activeAccount(), state.activeTab()));
        });
      }
    });
  }
}
