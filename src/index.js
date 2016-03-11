import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import App             from './containers/App';
import rootReducer     from './reducers';
import IpcAction       from './utils/IpcAction'
import TabKeyBinder    from './utils/TabKeyBinder'

let store = createStore(rootReducer);
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
