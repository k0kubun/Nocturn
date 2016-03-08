import Actions from '../actions';

export const userByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.REFRESH_USER_INFO:
      state[action.user.id] = action.user;
      return state;
    default:
      return state;
  }
}
