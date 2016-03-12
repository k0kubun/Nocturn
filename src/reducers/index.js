import { combineReducers } from 'redux';
import { accounts } from './accounts';
import { activeAccountIndex } from './active-account-index';
import { activeListIdByUserId } from './active-list-id-by-user-id';
import { inReplyTo } from './in-reply-to';
import { listsByUserId } from './lists-by-user-id';
import { searchQueryByUserId } from './search-query-by-user-id';
import { selectedTweetIdsByUserId } from './selected-tweet-ids-by-user-id';
import { selectedTabByUserId } from './selected-tab-by-user-id';
import { text } from './text';
import { tabsByUserId } from './tabs-by-user-id';
import { userByUserId } from './user-by-user-id';

const rootReducer = combineReducers({
  accounts,
  activeAccountIndex,
  activeListIdByUserId,
  inReplyTo,
  listsByUserId,
  searchQueryByUserId,
  selectedTabByUserId,
  selectedTweetIdsByUserId,
  text,
  tabsByUserId,
  userByUserId,
});

export default rootReducer
