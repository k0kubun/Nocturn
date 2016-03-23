import * as Keycode  from './keycode';
import Actions       from '../actions';
import RichState     from './rich-state';
import TwitterClient from './twitter-client';
import { shell }     from 'electron';

export default class GlobalKeyBind {
  static subscribe(store) {
    new GlobalKeyBind(store).subscribe();
  }

  constructor(store) {
    this.dispatch = store.dispatch;
    this.state = new RichState(store);
    store.subscribe(() => {
      this.state = new RichState(store);
    });
  }

  subscribe() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === Keycode.TAB) {
        this.handleTab(event);
        return;
      }

      if (!this.isEditing()) {
        switch (event.keyCode) {
          case Keycode.DOWN:
          case Keycode.J:
            this.handleJ(event);
            break;
          case Keycode.UP:
          case Keycode.K:
            this.handleK(event);
            break;
          case Keycode.F:
            this.handleF(event);
            break;
          case Keycode.T:
            this.handleT(event);
            break;
          case Keycode.SPACE:
          case Keycode.ZERO:
            this.handleZero(event);
            break;
          case Keycode.ENTER:
            this.handleEnter(event);
            break;
          case Keycode.R:
            if (event.shiftKey) this.handleShiftR(event);
            break;
        }
      }
    });
  }

  handleTab(event) {
    let editor = document.getElementById('tweet_editor');

    if (document.activeElement != editor) {
      event.preventDefault();
      editor.focus();
    }
  }

  handleJ(event) {
    if (event.altKey || event.metaKey) return;
    event.preventDefault();

    let tweet = this.state.findNextTweet();
    if (!tweet) return null;
    this.dispatch(Actions.selectTweet(tweet, this.state.activeTab(), this.state.activeAccount()));

    let visibleLimit = document.body.clientHeight;
    let activeBottom = document.querySelector('.timeline.active .tweets.active .tweet.active').getBoundingClientRect().bottom;
    if (visibleLimit < activeBottom) {
      let element = document.querySelector('.timeline.active .tweets.active');
      element.scrollTop += element.clientHeight / 2;
    }
  }

  handleK(event) {
    if (event.altKey || event.metaKey) return;
    event.preventDefault();

    let tweet = this.state.findPrevTweet();
    if (!tweet) return null;
    this.dispatch(Actions.selectTweet(tweet, this.state.activeTab(), this.state.activeAccount()));

    let activeTop = document.querySelector('.timeline.active .tweets.active .tweet.active').getBoundingClientRect().top;
    let visibleLimit = document.querySelector('.timeline.active .tweets.active').getBoundingClientRect().top;
    if (activeTop < visibleLimit) {
      let element = document.querySelector('.timeline.active .tweets.active');
      element.scrollTop -= element.clientHeight / 2;
    }
  }

  handleF(event) {
    event.preventDefault();

    let client = new TwitterClient(this.state.activeAccount());
    let active = this.state.activeTweet();
    if (!active) return null;

    client.favoriteStatus(active.id_str, (tweet) => {
      this.dispatch(Actions.addTweet(tweet, this.state.activeAccount(), this.state.activeTab()));
    });
  }

  handleT(event) {
    event.preventDefault();

    let tweet = this.state.activeTweet();
    if (!tweet) return null;

    for (let entity of [...tweet.entities.urls, ...(tweet.entities.media || [])]) {
      shell.openExternal(entity.expanded_url);
    }
  }

  handleZero(event) {
    event.preventDefault();

    let tweet = this.state.findFirstTweet();
    if (!tweet) return null;

    this.dispatch(Actions.selectTweet(tweet, this.state.activeTab(), this.state.activeAccount()));
    let element = document.querySelector('.timeline.active .tweets.active');
    element.scrollTop = 0;
  }

  handleEnter(event) {
    event.preventDefault();

    let tweet = this.state.activeTweet();
    if (!tweet) return null;

    this.dispatch(Actions.setText(`@${tweet.user.screen_name} `));
    this.dispatch(Actions.setInReplyTo(tweet));

    // FIXME: Use better way to focus
    document.getElementById('tweet_editor').focus();
  }

  handleShiftR(event) {
    event.preventDefault();

    let active = this.state.activeTweet();
    if (!active) return null;

    if (window.confirm(`Are you sure to retweet?: ${active.text}`)) {
      let client = new TwitterClient(this.state.activeAccount());
      client.retweetStatus(active.id_str, (tweet) => {
        this.dispatch(Actions.addTweet(tweet, this.state.activeAccount(), this.state.activeTab()));
      });
    }
  }

  isEditing() {
    return document.activeElement.id === 'tweet_editor' ||
      document.activeElement.className === 'search_field';
  }
}
