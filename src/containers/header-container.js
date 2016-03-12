import { connect } from 'react-redux';
import Actions     from '../actions';
import Header      from '../components/header'

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeAccount: activeAccount,
    activeListId: activeAccount && state.activeListIdByUserId[activeAccount.id],
    activeSearchQuery: activeAccount && state.searchQueryByUserId[activeAccount.id],
  }
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
})(Header);
