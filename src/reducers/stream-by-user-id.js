import Actions from '../actions';

export const streamByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_OPEN_STREAM:
      return {
        ...state,
        [action.account.id_str]: action.stream,
      };
    case Actions.CLOSE_STREAM:
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
