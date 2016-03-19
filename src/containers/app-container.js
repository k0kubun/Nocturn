import { connect }    from 'react-redux';
import Actions        from '../actions';
import App            from '../components/app';
import Authentication from '../utils/authentication';
import TwitterClient  from '../utils/twitter-client';

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
        dispatch(Actions.accounts.addAccount(account));

        let client = new TwitterClient(account);
        client.verifyCredentials((user) => {
          dispatch(Actions.accounts.refreshUserInfo(user));
        });
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
