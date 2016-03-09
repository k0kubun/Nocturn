import { combineReducers } from 'redux';
import { accounts } from './accounts';
import { activeAccountIndex } from './activeAccountIndex';
import { activeListIdByUserId } from './activeListIdByUserId';
import { listsByUserId } from './listsByUserId';
import { searchQueryByUserId } from './searchQueryByUserId';
import { selectedTabByUserId } from './selectedTabByUserId';
import { text } from './text';
import { tabsByUserId } from './tabsByUserId';
import { userByUserId } from './userByUserId';

const rootReducer = combineReducers({
  accounts,
  activeAccountIndex,
  activeListIdByUserId,
  listsByUserId,
  searchQueryByUserId,
  selectedTabByUserId,
  text,
  tabsByUserId,
  userByUserId,
});

export default rootReducer
