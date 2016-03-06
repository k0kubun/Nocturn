export const SET_TEXT = 'SET_TEXT';
export const CLEAR_TEXT = 'CLEAR_TEXT';

export const clearText = () => {
  return { type: CLEAR_TEXT }
}

export const setText = (text) => {
  return { type: SET_TEXT, text }
}
