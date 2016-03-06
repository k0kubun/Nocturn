import React  from 'react';
import Editor from './Editor';
import Header from '../components/Header';
import Timeline from './Timeline';
import Authentication from '../utils/Authentication'
import TwitterClient from '../utils/TwitterClient'
import { connect } from 'react-redux';
import * as Actions from '../actions';

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
  }

  render() {
    return(
      <div className='timeline_container'>
        <Header />

        <select id='account_selector' name='account_list'></select>
        <Editor user={this.props.activeUser} />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <Timeline
              key={account.id}
              account={account}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    accounts:   state.accounts,
    activeUser: activeAccount && state.userByUserId[activeAccount.id],
  }
}

export default connect(mapStateToProps, Actions.app)(App);
