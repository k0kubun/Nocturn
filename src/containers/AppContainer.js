import { connect } from 'react-redux';
import { addAccount, activateAccount } from '../actions';
import App from '../components/App';
import Authentication from '../utils/Authentication'

const mapStateToProps = (state) => {
  return {
    accounts:     state.accounts,
    accountIndex: state.accountIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAppInit: () => {
      let accounts = Authentication.allAccounts();
      for (let account of accounts) {
        dispatch(addAccount(account));
      }
      dispatch(activateAccount(accounts[0]));
    },
    onTweetReceived: (tweet) => {
      dispatch(addTweet(tweet))
    },
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer
