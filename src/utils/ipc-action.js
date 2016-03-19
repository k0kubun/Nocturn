import { ipcRenderer } from 'electron';
import Actions         from '../actions';
import RichState       from './rich-state';
import TwitterClient   from './twitter-client';

export default class IpcAction {
  static subscribe(store) {
    new IpcAction(store).subscribe();
  }

  constructor(store) {
    this.dispatch = store.dispatch;
    this.state = new RichState(store);
    store.subscribe(() => {
      this.state = new RichState(store);
    });
  }

  subscribe(store) {
    ipcRenderer.on('invoke-reply', (event) => {
      let tweet = this.state.activeTweet();
      if (!tweet) return null;

      this.dispatch(Actions.texts.setText(`@${tweet.user.screen_name} `));
      this.dispatch(Actions.tweets.setInReplyTo(tweet));

      // FIXME: Use better way to focus
      document.getElementById('tweet_editor').focus();
    });

    ipcRenderer.on('invoke-retweet', (event) => {
      let client = new TwitterClient(this.state.activeAccount());
      let active = this.state.activeTweet();
      if (!active) return null;

      if (window.confirm(`Are you sure to retweet?: ${active.text}`)) {
        client.retweetStatus(active.id_str, (tweet) => {
          this.dispatch(Actions.tweets.addTweet(tweet, this.state.activeAccount(), state.activeTab()));
        });
      }
    });

    ipcRenderer.on('invoke-delete', (event) => {
      let client = new TwitterClient(this.state.activeAccount());
      let active = this.state.activeTweet();
      if (!active) return null;

      client.deleteStatus(active.id_str, (tweet) => {
        this.dispatch(Actions.tweets.removeTweet(tweet, this.state.activeAccount(), state.activeTab()));
      });
    });

    ipcRenderer.on('select-next-tab', (event) => {
      let tab = this.state.nextTab();
      this.dispatch(Actions.tabs.selectTab(tab, this.state.activeAccount()));
    });

    ipcRenderer.on('select-prev-tab', (event) => {
      let tab = this.state.prevTab();
      this.dispatch(Actions.tabs.selectTab(tab, this.state.activeAccount()));
    });

    ipcRenderer.on('select-next-account', (event) => {
      let index = this.state.nextAccountIndex();
      this.dispatch(Actions.accounts.activateAccount(index));
    });

    ipcRenderer.on('select-prev-account', (event) => {
      let index = this.state.prevAccountIndex();
      this.dispatch(Actions.accounts.activateAccount(index));
    });
  }
}
