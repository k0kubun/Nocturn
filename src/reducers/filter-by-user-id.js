import Actions from '../actions';

export const filterByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_OPEN_FILTER:
      return {
        ...state,
        [action.account.id_str]: action.stream,
      };
    default:
      return state;
  }
}
