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
    ipcRenderer.on('invoke-delete', (event) => {
      if (!this.state.activeTweet()) return;
      this.dispatch(
        Actions.deleteTweet(
          this.state.activeTweet(),
          this.state.activeAccount(),
          this.state.activeTab(),
        ),
      );
    });

    ipcRenderer.on('select-next-tab', (event) => {
      let tab = this.state.nextTab();
      this.dispatch(Actions.selectTab(tab, this.state.activeAccount()));
      this.updateMarkAsRead(tab);
    });

    ipcRenderer.on('select-prev-tab', (event) => {
      let tab = this.state.prevTab();
      this.dispatch(Actions.selectTab(tab, this.state.activeAccount()));
      this.updateMarkAsRead(tab);
    });

    ipcRenderer.on('select-next-account', (event) => {
      let index = this.state.nextAccountIndex();
      this.dispatch(Actions.activateAccount(index));
      this.refreshTime(index);
    });

    ipcRenderer.on('select-prev-account', (event) => {
      let index = this.state.prevAccountIndex();
      this.dispatch(Actions.activateAccount(index));
      this.refreshTime(index);
    });

    ipcRenderer.on('reload-timeline', (event) => {
      this.client().homeTimeline({ count: 50 }, (tweets) => {
        for (let tweet of tweets) {
          this.dispatch(Actions.addTweet(tweet, this.state.activeAccount()));
        }
      });

      const listId = this.state.activeListId();
      if (listId) this.dispatch(Actions.loadList(listId, this.state.activeAccount()));

      const query = this.state.activeSearchQuery();
      if (query) this.dispatch(Actions.loadSearch(query, this.state.activeAccount()));

      this.dispatch(Actions.reconnectStreaming(this.state.activeAccount()));
    });
  }

  addTweetToTab(tweet, account, tab) {
    this.dispatch(Actions.addTweetToTab(tweet, account, tab));
  }

  client() {
    return new TwitterClient(this.state.activeAccount());
  }

  refreshTime(index) {
    let account = this.state.state.accounts[index];
    let tab = this.state.state.selectedTabByUserId[account.id_str] || 'home';
    this.dispatch(Actions.refreshTabTime(tab, account));
  }

  updateMarkAsRead(tab) {
    if (tab === 'mentions') {
      let mention = this.state.latestMention();
      if (mention) {
        this.dispatch(Actions.markAsRead(mention, this.state.activeAccount()));
      }
    }
  }
}
