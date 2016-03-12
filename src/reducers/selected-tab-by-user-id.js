import Actions from '../actions';

export const selectedTabByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.tabs.SELECT_TAB:
      return {
        ...state,
        [action.account.id]: action.tab,
      };
    default:
      return state;
  }
}
