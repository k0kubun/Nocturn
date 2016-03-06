import React from 'react';
import { connect } from 'react-redux';
import AccountSelector from './AccountSelector';
import Authentication  from '../utils/Authentication'
import Editor          from './Editor';
import Header          from '../components/Header';
import Timeline        from './Timeline';
import TwitterClient   from '../utils/TwitterClient'
import Actions         from '../actions';

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
      });
    }
  }

  render() {
    return(
      <div className='timeline_container'>
        <Header />

        <AccountSelector />
        <Editor user={this.props.activeUser} />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <Timeline
              key={account.id}
              account={account}
              tweets={this.props.tweetsByUserId[account.id] || []}
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
    tweetsByUserId: state.tweetsByUserId,
  }
}

export default connect(mapStateToProps, Actions)(App);
