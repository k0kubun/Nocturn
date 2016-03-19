import Actions from '../actions';

export const selectedTabByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.SELECT_TAB:
      return {
        ...state,
        [action.account.id_str]: action.tab,
      };
    default:
      return state;
  }
}
