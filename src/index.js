import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';
import configureStore  from './store/configureStore'
import App             from './containers/App';
import IpcAction       from './utils/IpcAction';
import TabKeyBinder    from './utils/TabKeyBinder';

let store = configureStore();
new IpcAction(document).subscribe(store);
new TabKeyBinder(document).bindFocus();

if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log(store.getState());
  })
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
