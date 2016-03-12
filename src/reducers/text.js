import Actions from '../actions';

export const text = (state = '', action) => {
  switch (action.type) {
    case Actions.texts.SET_TEXT:
      return action.text;
    case Actions.texts.CLEAR_TEXT:
      return '';
    default:
      return state;
  }
}
