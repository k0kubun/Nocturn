import Actions from '../actions';

export const listsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.lists.SET_LISTS:
      return {
        ...state,
        [action.account.id]: action.lists,
      };
    default:
      return state;
  }
}
