export const SET_ACTIVE_LIST_ID = 'SET_ACTIVE_LIST_ID';
export const SET_LISTS = 'SET_LISTS';

export const setActiveListId = (listId, account) => {
  return { type: SET_ACTIVE_LIST_ID, listId, account }
}

export const setLists = (lists, account) => {
  return { type: SET_LISTS, lists, account }
}
