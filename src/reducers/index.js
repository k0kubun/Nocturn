import { combineReducers } from 'redux';
import { accounts } from './accounts';
import { activeAccountIndex } from './activeAccountIndex';
import { activeListIdByUserId } from './activeListIdByUserId';
import { inReplyTo } from './inReplyTo';
import { listsByUserId } from './listsByUserId';
import { searchQueryByUserId } from './searchQueryByUserId';
import { selectedTweetIdsByUserId } from './selectedTweetIdsByUserId';
import { selectedTabByUserId } from './selectedTabByUserId';
import { text } from './text';
import { tabsByUserId } from './tabsByUserId';
import { userByUserId } from './userByUserId';

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
