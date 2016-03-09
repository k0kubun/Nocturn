export const SET_ACTIVE_LIST_ID = 'SET_ACTIVE_LIST_ID';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const CLEAR_AND_SET_TWEETS  = 'CLEAR_AND_SET_TWEETS';

export const setActiveListId = (listId, account) => {
  return { type: SET_ACTIVE_LIST_ID, listId, account }
}

export const setSearchQuery = (query, account) => {
  return { type: SET_SEARCH_QUERY, query, account }
}

export const clearAndSetTweets = (tweets, account, tab) => {
  return { type: CLEAR_AND_SET_TWEETS, tweets, account, tab }
}
