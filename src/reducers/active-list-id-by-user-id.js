import Actions from '../actions';

export const activeListIdByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.lists.SET_ACTIVE_LIST_ID:
      return {
        ...state,
        [action.account.id]: action.listId,
      };
    default:
      return state;
  }
}
