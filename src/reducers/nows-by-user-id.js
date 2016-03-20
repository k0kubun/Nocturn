import Actions from '../actions';

export const nowsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.REFRESH_TAB_TIME:
    case Actions.SELECT_TAB:
      return {
        ...state,
        [action.account.id_str]: {
          ...(state[action.account.id_str] || {}),
          [action.tab]: Date.now(),
        }
      };
    default:
      return state;
  }
}
