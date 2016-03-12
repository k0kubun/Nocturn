import rootReducer from '../reducers';
import DevTools    from '../containers/DevTools';
import { createStore, compose } from 'redux';

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      DevTools.instrument(),
    )
  );
}
