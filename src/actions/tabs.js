export const SELECT_TAB = 'SELECT_TAB';

export const selectTab = (tab, account) => {
  return { type: SELECT_TAB, tab, account }
}
