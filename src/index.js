import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';
import AppContainer    from './containers/app-container';
import GlobalKeyBind   from './utils/global-key-bind';
import IpcAction       from './utils/ipc-action';
import TimeRefresher   from './utils/time-refresher';
import configureStore  from './store/configure-store';
import rootReducer     from './reducers';

let store = configureStore();
IpcAction.subscribe(store);
GlobalKeyBind.subscribe(store);
TimeRefresher.subscribe(store);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
