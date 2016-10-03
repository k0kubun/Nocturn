import { combineReducers } from 'redux';
import { accounts } from './accounts';
import { activeAccountIndex } from './active-account-index';
import { activeListIdByUserId } from './active-list-id-by-user-id';
import { editorFocused } from './editor-focused';
import { filterByUserId } from './filter-by-user-id';
import { inReplyTo } from './in-reply-to';
import { listsByUserId } from './lists-by-user-id';
import { nowsByUserId } from './nows-by-user-id';
import { readByUserId } from './read-by-user-id';
import { searchQueryByUserId } from './search-query-by-user-id';
import { selectedTabByUserId } from './selected-tab-by-user-id';
import { selectedTweetIdsByUserId } from './selected-tweet-ids-by-user-id';
import { streamByUserId } from './stream-by-user-id';
import { tabsByUserId } from './tabs-by-user-id';
import { text } from './text';
import { userByUserId } from './user-by-user-id';

const rootReducer = combineReducers({
  accounts,
  activeAccountIndex,
  activeListIdByUserId,
  editorFocused,
  filterByUserId,
  inReplyTo,
  listsByUserId,
  nowsByUserId,
  readByUserId,
  searchQueryByUserId,
  selectedTabByUserId,
  selectedTweetIdsByUserId,
  streamByUserId,
  tabsByUserId,
  text,
  userByUserId,
});

export default rootReducer
