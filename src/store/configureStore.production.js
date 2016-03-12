import rootReducer     from '../reducers';
import { createStore } from 'redux';

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState);
}
