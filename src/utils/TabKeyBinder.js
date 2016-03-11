import * as Keycode  from './Keycode';

export default class TabKeyBinder {
  constructor(document) {
    this.document = document;
  }

  bindFocus() {
    this.document.addEventListener('keydown', (event) => {
      if (event.keyCode != Keycode.TAB) return;
      let editor = this.document.getElementById('tweet_editor');

      if (this.document.activeElement != editor) {
        event.preventDefault();
        editor.focus();
      }
    });
  }
}
