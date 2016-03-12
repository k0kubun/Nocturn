import Actions     from '../actions';
import { connect } from 'react-redux';
import Timeline    from '../components/timeline'

const mapStateToProps = (state, props) => {
  let activeAccount = state.accounts[state.activeAccountIndex] || {};
  return {
    active: activeAccount.id == props.account.id,
  };
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
  ...Actions.lists,
})(Timeline);
