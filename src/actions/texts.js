export const CLEAR_TEXT = 'CLEAR_TEXT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_TEXT = 'SET_TEXT';
export const FOCUS_EDITOR = 'FOCUS_EDITOR';
export const BLUR_EDITOR = 'BLUR_EDITOR';

export const clearText = () => {
  return { type: CLEAR_TEXT }
}

export const setSearchQuery = (query, account) => {
  return { type: SET_SEARCH_QUERY, query, account }
}

export const setText = (text) => {
  return { type: SET_TEXT, text }
}

export const focusEditor = () => {
  return { type: FOCUS_EDITOR }
}

export const blurEditor = () => {
  return { type: BLUR_EDITOR }
}
