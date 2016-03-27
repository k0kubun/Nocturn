import Actions from '../actions';

export const accounts = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_ACCOUNT_TO_LIST:
      return [...state, action.account];
    default:
      return state;
  }
}
