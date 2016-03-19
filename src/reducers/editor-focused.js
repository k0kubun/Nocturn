import Actions from '../actions';

export const editorFocused = (state = false, action) => {
  switch (action.type) {
    case Actions.FOCUS_EDITOR:
      return true;
    case Actions.BLUR_EDITOR:
      return false;
    default:
      return state;
  }
}
