import Actions from '../actions';

export const searchQueryByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.texts.SET_SEARCH_QUERY:
      return {
        ...state,
        [action.account.id_str]: action.query,
      };
    default:
      return state;
  }
}
