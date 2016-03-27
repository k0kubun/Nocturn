import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import { applyMiddleware, createStore } from 'redux';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      ReduxThunk,
    ),
  );
}
