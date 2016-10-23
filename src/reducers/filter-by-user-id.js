import Actions from '../actions';

export const filterByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_OPEN_FILTER:
      return {
        ...state,
        [action.account.id_str]: action.stream,
      };
    case Actions.CLOSE_FILTER:
      if (state[action.account.id_str]) {
        state[action.account.id_str].destroy();
      }
      return {
        ...state,
        [action.account.id_str]: null,
      }
    default:
      return state;
  }
}
