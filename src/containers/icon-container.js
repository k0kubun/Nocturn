import Actions     from '../actions';
import { connect } from 'react-redux';
import Icon        from '../components/icon';

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeUser: activeAccount && state.userByUserId[activeAccount.id_str],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTwitterIconClicked: (event) => {
      event.preventDefault();
      dispatch(Actions.toggleAccountSelector());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
