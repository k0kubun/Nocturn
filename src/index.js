import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import App             from './containers/App';
import rootReducer     from './reducers';
import IpcAction       from './utils/IpcAction'

let store = createStore(rootReducer);
new IpcAction(document).subscribe(store);

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
