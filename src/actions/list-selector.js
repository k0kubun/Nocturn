export const SET_ACTIVE_LIST_ID = 'SET_ACTIVE_LIST_ID';
export const RESET_LIST_TWEETS  = 'RESET_LIST_TWEETS';

export const setActiveListId = (listId, account) => {
  return { type: SET_ACTIVE_LIST_ID, listId, account }
}

export const resetListTweets = (tweets, account) => {
  return { type: RESET_LIST_TWEETS, tweets, account }
}
