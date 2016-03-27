import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { applyMiddleware, createStore } from 'redux';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      ReduxThunk,
      //createLogger(),
    ),
  );
}
