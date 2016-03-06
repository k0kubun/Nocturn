import React  from 'react';
import Editor from '../components/Editor';
import Header from '../components/Header';
import Timeline from './Timeline';
import Authentication from '../utils/Authentication'
import TwitterClient from '../utils/TwitterClient'
import { connect } from 'react-redux';
import { addAccount, activateAccount, refreshUserInfo } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.initializeAccounts();
  }

  initializeAccounts() {
    let accounts = Authentication.allAccounts();
    for (let account of accounts) {
      this.props.addAccount(account);

      let client = new TwitterClient(account);
      client.verifyCredentials((user) => {
        this.props.refreshUserInfo(user);
      })
    }

    this.props.activateAccount(accounts[0]);
  }

  render() {
    return(
      <div className='timeline_container'>
        <Header />

        <select id='account_selector' name='account_list'></select>
        <Editor user={this.props.activeAccount} />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <Timeline
              key={account.userId}
              account={account}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts:      state.accounts,
    activeAccount: state.userByUserId[state.activeAccountId],
  }
}

export default connect(mapStateToProps, {
  addAccount,
  refreshUserInfo,
  activateAccount,
})(App);
