import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { applyMiddleware, createStore } from 'redux';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      createLogger(),
    ),
  );

  return store;
}
