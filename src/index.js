import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import AppContainer    from './containers/app-container';
import rootReducer     from './reducers';
import IpcAction       from './utils/ipc-action';
import GlobalKeyBind   from './utils/global-key-bind';

let store = createStore(rootReducer);
new IpcAction(document).subscribe(store);
new GlobalKeyBind(document).subscribe(store);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
