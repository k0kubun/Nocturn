export const SELECT_TAB = 'SELECT_TAB';
export const REFRESH_TAB_TIME = 'REFRESH_TAB_TIME';

export const selectTab = (tab, account) => {
  return { type: SELECT_TAB, tab, account }
}

export const refreshTabTime = (tab, account) => {
  return { type: REFRESH_TAB_TIME, tab, account }
}
