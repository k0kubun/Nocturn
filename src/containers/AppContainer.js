import { connect } from 'react-redux';
import { addAccount } from '../actions';
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
      for (let account of Authentication.allAccounts()) {
        dispatch(addAccount(account));
      }
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
