import { connect } from 'react-redux';
import Actions     from '../actions';
import Account     from '../components/account'

const mapStateToProps = (state) => {
  return {
    accounts:           state.accounts,
    activeAccountIndex: state.activeAccountIndex,
  }
}

export default connect(mapStateToProps, {
  ...Actions.accounts,
})(Account);
