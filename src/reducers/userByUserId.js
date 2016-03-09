import Actions from '../actions';

export const userByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.REFRESH_USER_INFO:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    default:
      return state;
  }
}
