import Actions       from '../actions';
import RichState     from './rich-state';

export default class TimeRefresher {
  static subscribe(store) {
    new TimeRefresher(store).subscribe();
  }

  constructor(store) {
    this.store = store;
  }

  subscribe() {
    setInterval(this.refresh.bind(this), 1000 * 60);
  }

  refresh() {
    let state = new RichState(this.store);
    this.store.dispatch(
      Actions.refreshTabTime(
        state.activeTab(),
        state.activeAccount(),
      )
    );
  }
}
