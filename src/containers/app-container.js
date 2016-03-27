import { connect }    from 'react-redux';
import Actions        from '../actions';
import App            from '../components/app';
import Authentication from '../utils/authentication';

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeAccounts: () => {
      let accounts = Authentication.allAccounts();
      for (let account of accounts) {
        dispatch(Actions.addAccount(account));
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
