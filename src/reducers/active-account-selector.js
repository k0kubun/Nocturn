import Actions from '../actions';

export const activeAccountSelector = (state = false, action) => {
  switch (action.type) {
    case Actions.TOGGLE_ACCOUNT_SELECTOR:
      return !state;
    default:
      return state;
  }
}
