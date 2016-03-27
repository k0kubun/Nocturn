import rootReducer     from '../reducers';
import { createStore } from 'redux';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  return store;
}
