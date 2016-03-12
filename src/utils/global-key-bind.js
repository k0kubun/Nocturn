import * as Keycode from './keycode';
import RichState    from './rich-state'
import Actions      from '../actions';

export default class GlobalKeyBind {
  constructor(document) {
    this.document = document;
  }

  subscribe(store) {
    this.store = store;
    this.document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case Keycode.TAB:
          this.handleTab(event);
          break;
        case Keycode.DOWN:
        case Keycode.J:
          this.handleJ(event);
          break;
        case Keycode.UP:
        case Keycode.K:
          this.handleK(event);
          break;
      }
    });
  }

  handleTab(event) {
    let editor = this.document.getElementById('tweet_editor');

    if (this.document.activeElement != editor) {
      event.preventDefault();
      editor.focus();
    }
  }

  handleJ(event) {
    if (this.isEditing() || event.altKey) return;
    event.preventDefault();

    let state = new RichState(store);
    let tweet = state.findNextTweet();
    if (!tweet) return null;
    store.dispatch(Actions.tweets.selectTweet(tweet, state.activeTab(), state.activeAccount()));

    let visibleLimit = this.document.body.clientHeight;
    let activeBottom = this.document.querySelector('.timeline.active .tweets.active .tweet.active').getBoundingClientRect().bottom;
    if (visibleLimit < activeBottom) {
      let element = this.document.querySelector('.timeline.active .tweets.active');
      element.scrollTop += element.clientHeight / 2;
    }
  }

  handleK(event) {
    if (this.isEditing() || event.altKey) return;
    event.preventDefault();

    let state = new RichState(store);
    let tweet = state.findPrevTweet();
    if (!tweet) return null;
    store.dispatch(Actions.tweets.selectTweet(tweet, state.activeTab(), state.activeAccount()));

    let activeTop = this.document.querySelector('.timeline.active .tweets.active .tweet.active').getBoundingClientRect().top;
    let visibleLimit = this.document.querySelector('.timeline.active .tweets.active').getBoundingClientRect().top;
    if (activeTop < visibleLimit) {
      let element = this.document.querySelector('.timeline.active .tweets.active');
      element.scrollTop -= element.clientHeight / 2;
    }
  }

  isEditing() {
    return this.document.activeElement.id === 'tweet_editor' ||
      this.document.activeElement.className === 'search_field';
  }
}
