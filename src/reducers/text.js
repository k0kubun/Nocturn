import Actions from '../actions';

export const text = (state = '', action) => {
  switch (action.type) {
    case Actions.SET_TEXT:
      return action.text;
    case Actions.CLEAR_TEXT:
      return '';
    default:
      return state;
  }
}
