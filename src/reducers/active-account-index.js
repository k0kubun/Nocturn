import Actions from '../actions';

export const activeAccountIndex = (state = 0, action) => {
  switch (action.type) {
    case Actions.accounts.ACTIVATE_ACCOUNT:
      return action.index;
    default:
      return state;
  }
}
